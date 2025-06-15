"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
exports.initProductModel = initProductModel;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
function initProductModel(sequelize) {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        ownerId: {
            type: sequelize_1.DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
    }, {
        sequelize,
        tableName: 'products',
        timestamps: true,
    });
    return Product;
}
