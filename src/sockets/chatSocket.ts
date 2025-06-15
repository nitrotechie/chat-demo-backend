import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ChatRoom } from '../models/chatRoom';
import { Message } from '../models/message';
import { encrypt, decrypt } from '../utils/encryption';
import { User } from '../models/user';
import { Product } from '../models/product';
import { ProductRequest } from '../models/productRequest';
import { Op } from 'sequelize';

interface AuthenticatedSocket extends Socket {
    user?: { id: number; email: string };
}

export function setupSocket(io: Server) {
    io.use(async (socket: AuthenticatedSocket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
            socket.user = { id: payload.id, email: payload.email };
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket: AuthenticatedSocket) => {
        // chat:list
        socket.on('chat:list', async () => {
            const chatRooms = await ChatRoom.findAll({
                where: { [Op.or]: [{ userAId: socket.user!.id }, { userBId: socket.user!.id }] },
                include: [Product, User],
            });
            socket.emit('chat:list', chatRooms);
        });

        // chat:create
        socket.on('chat:create', async ({ productId, userAId, userBId }) => {
            // Only allow if user is involved
            if (![userAId, userBId].includes(socket.user!.id)) return;
            const chatRoom = await ChatRoom.create({ productId, userAId, userBId });
            io.to([userAId.toString(), userBId.toString()]).emit('chat:create', chatRoom);
        });

        // message:send
        socket.on('message:send', async ({ chatRoomId, content }) => {
            const encrypted = encrypt(content);
            const message = await Message.create({
                chatRoomId,
                senderId: socket.user!.id,
                content: encrypted,
            });
            io.to(chatRoomId.toString()).emit('message:receive', {
                ...message.toJSON(),
                content: content, // send decrypted for real-time
            });
        });

        // message:history
        socket.on('message:history', async ({ chatRoomId, page = 1, pageSize = 20 }) => {
            const messages = await Message.findAll({
                where: { chatRoomId },
                order: [['createdAt', 'DESC']],
                offset: (page - 1) * pageSize,
                limit: pageSize,
            });
            socket.emit('message:history', messages.map(m => ({ ...m.toJSON(), content: decrypt(m.content) })));
        });
    });
}
