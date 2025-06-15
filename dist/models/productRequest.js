"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRequest = void 0;
exports.initProductRequestModel = initProductRequestModel;
const sequelize_1 = require("sequelize");
class ProductRequest extends sequelize_1.Model {
}
exports.ProductRequest = ProductRequest;
function initProductRequestModel(sequelize) {
    ProductRequest.init({
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
        requestedById: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('PENDING', 'ACCEPTED'),
            allowNull: false,
            defaultValue: 'PENDING',
        },
    }, {
        sequelize,
        tableName: 'product_requests',
        timestamps: true,
    });
    return ProductRequest;
}
