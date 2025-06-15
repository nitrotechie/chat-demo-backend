"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chatRoom_1 = require("../models/chatRoom");
const message_1 = require("../models/message");
const encryption_1 = require("../utils/encryption");
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const sequelize_1 = require("sequelize");
function setupSocket(io) {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error('Authentication error'));
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            socket.user = { id: payload.id, email: payload.email };
            next();
        }
        catch (err) {
            next(new Error('Authentication error'));
        }
    });
    io.on('connection', (socket) => {
        // chat:list
        socket.on('chat:list', async () => {
            const chatRooms = await chatRoom_1.ChatRoom.findAll({
                where: { [sequelize_1.Op.or]: [{ userAId: socket.user.id }, { userBId: socket.user.id }] },
                include: [product_1.Product, user_1.User],
            });
            socket.emit('chat:list', chatRooms);
        });
        // chat:create
        socket.on('chat:create', async ({ productId, userAId, userBId }) => {
            // Only allow if user is involved
            if (![userAId, userBId].includes(socket.user.id))
                return;
            const chatRoom = await chatRoom_1.ChatRoom.create({ productId, userAId, userBId });
            io.to([userAId.toString(), userBId.toString()]).emit('chat:create', chatRoom);
        });
        // message:send
        socket.on('message:send', async ({ chatRoomId, content }) => {
            const encrypted = (0, encryption_1.encrypt)(content);
            const message = await message_1.Message.create({
                chatRoomId,
                senderId: socket.user.id,
                content: encrypted,
            });
            io.to(chatRoomId.toString()).emit('message:receive', {
                ...message.toJSON(),
                content: content, // send decrypted for real-time
            });
        });
        // message:history
        socket.on('message:history', async ({ chatRoomId, page = 1, pageSize = 20 }) => {
            const messages = await message_1.Message.findAll({
                where: { chatRoomId },
                order: [['createdAt', 'DESC']],
                offset: (page - 1) * pageSize,
                limit: pageSize,
            });
            socket.emit('message:history', messages.map(m => ({ ...m.toJSON(), content: (0, encryption_1.decrypt)(m.content) })));
        });
    });
}
