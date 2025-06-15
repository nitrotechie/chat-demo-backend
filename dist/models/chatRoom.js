"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
exports.initChatRoomModel = initChatRoomModel;
const sequelize_1 = require("sequelize");
class ChatRoom extends sequelize_1.Model {
}
exports.ChatRoom = ChatRoom;
function initChatRoomModel(sequelize) {
    ChatRoom.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'products', key: 'id' },
        },
        userAId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        userBId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
    }, {
        sequelize,
        tableName: 'chat_rooms',
        timestamps: true,
    });
    return ChatRoom;
}
