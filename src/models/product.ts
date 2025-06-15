import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { User } from './user';

export interface ProductAttributes {
    id: number;
    name: string;
    ownerId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public ownerId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initProductModel(sequelize: Sequelize): typeof Product {
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            ownerId: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
        },
        {
            sequelize,
            tableName: 'products',
            timestamps: true,
        }
    );
    return Product;
}
