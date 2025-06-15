import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initProductModel, Product } from './product';
import { initProductRequestModel, ProductRequest } from './productRequest';
import { initChatRoomModel, ChatRoom } from './chatRoom';
import { initMessageModel, Message } from './message';

export function initializeModels(sequelize: Sequelize) {
    initUserModel(sequelize);
    initProductModel(sequelize);
    initProductRequestModel(sequelize);
    initChatRoomModel(sequelize);
    initMessageModel(sequelize);

    // Associations (example, adjust as needed)
    Product.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
    ProductRequest.belongsTo(Product, { foreignKey: 'productId' });
    ProductRequest.belongsTo(User, { foreignKey: 'requestedById', as: 'requester' });
    ChatRoom.belongsTo(Product, { foreignKey: 'productId' });
    ChatRoom.belongsTo(User, { foreignKey: 'userAId', as: 'userA' });
    ChatRoom.belongsTo(User, { foreignKey: 'userBId', as: 'userB' });
    Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' });
    Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
}

export { User, Product, ProductRequest, ChatRoom, Message };
