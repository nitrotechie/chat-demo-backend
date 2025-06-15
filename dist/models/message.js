"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
exports.initMessageModel = initMessageModel;
const sequelize_1 = require("sequelize");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
function initMessageModel(sequelize) {
    Message.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            autoIncrement: true,
            primaryKey: true,
        },
        chatRoomId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'chat_rooms', key: 'id' },
        },
        senderId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'messages',
        timestamps: true,
    });
    return Message;
}
