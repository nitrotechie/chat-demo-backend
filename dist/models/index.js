"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.ChatRoom = exports.ProductRequest = exports.Product = exports.User = void 0;
exports.initializeModels = initializeModels;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const product_1 = require("./product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_1.Product; } });
const productRequest_1 = require("./productRequest");
Object.defineProperty(exports, "ProductRequest", { enumerable: true, get: function () { return productRequest_1.ProductRequest; } });
const chatRoom_1 = require("./chatRoom");
Object.defineProperty(exports, "ChatRoom", { enumerable: true, get: function () { return chatRoom_1.ChatRoom; } });
const message_1 = require("./message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return message_1.Message; } });
function initializeModels(sequelize) {
    (0, user_1.initUserModel)(sequelize);
    (0, product_1.initProductModel)(sequelize);
    (0, productRequest_1.initProductRequestModel)(sequelize);
    (0, chatRoom_1.initChatRoomModel)(sequelize);
    (0, message_1.initMessageModel)(sequelize);
    // Associations (example, adjust as needed)
    product_1.Product.belongsTo(user_1.User, { foreignKey: 'ownerId', as: 'owner' });
    productRequest_1.ProductRequest.belongsTo(product_1.Product, { foreignKey: 'productId' });
    productRequest_1.ProductRequest.belongsTo(user_1.User, { foreignKey: 'requestedById', as: 'requester' });
    chatRoom_1.ChatRoom.belongsTo(product_1.Product, { foreignKey: 'productId' });
    chatRoom_1.ChatRoom.belongsTo(user_1.User, { foreignKey: 'userAId', as: 'userA' });
    chatRoom_1.ChatRoom.belongsTo(user_1.User, { foreignKey: 'userBId', as: 'userB' });
    message_1.Message.belongsTo(chatRoom_1.ChatRoom, { foreignKey: 'chatRoomId' });
    message_1.Message.belongsTo(user_1.User, { foreignKey: 'senderId', as: 'sender' });
}
