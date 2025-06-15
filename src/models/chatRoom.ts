import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface ChatRoomAttributes {
    id: number;
    productId: number;
    userAId: number;
    userBId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ChatRoomCreationAttributes extends Optional<ChatRoomAttributes, 'id'> { }

export class ChatRoom extends Model<ChatRoomAttributes, ChatRoomCreationAttributes> implements ChatRoomAttributes {
    public id!: number;
    public productId!: number;
    public userAId!: number;
    public userBId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initChatRoomModel(sequelize: Sequelize): typeof ChatRoom {
    ChatRoom.init(
        {
            id: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                autoIncrement: true,
                primaryKey: true,
            },
            productId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'products', key: 'id' },
            },
            userAId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            userBId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
        },
        {
            sequelize,
            tableName: 'chat_rooms',
            timestamps: true,
        }
    );
    return ChatRoom;
}
