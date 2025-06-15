import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface MessageAttributes {
    id: number;
    chatRoomId: number;
    senderId: number;
    content: string; // encrypted
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> { }

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    public id!: number;
    public chatRoomId!: number;
    public senderId!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initMessageModel(sequelize: Sequelize): typeof Message {
    Message.init(
        {
            id: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                autoIncrement: true,
                primaryKey: true,
            },
            chatRoomId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'chat_rooms', key: 'id' },
            },
            senderId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'messages',
            timestamps: true,
        }
    );
    return Message;
}
