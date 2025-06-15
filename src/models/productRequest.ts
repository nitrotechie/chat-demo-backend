import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { User } from './user';
import { Product } from './product';

export type ProductRequestStatus = 'PENDING' | 'ACCEPTED';

export interface ProductRequestAttributes {
    id: number;
    productId: number;
    requestedById: number;
    status: ProductRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductRequestCreationAttributes extends Optional<ProductRequestAttributes, 'id'> { }

export class ProductRequest extends Model<ProductRequestAttributes, ProductRequestCreationAttributes> implements ProductRequestAttributes {
    public id!: number;
    public productId!: number;
    public requestedById!: number;
    public status!: ProductRequestStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initProductRequestModel(sequelize: Sequelize): typeof ProductRequest {
    ProductRequest.init(
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
            requestedById: {
                type: DataTypes.INTEGER, // PostgreSQL does not support UNSIGNED
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'ACCEPTED'),
                allowNull: false,
                defaultValue: 'PENDING',
            },
        },
        {
            sequelize,
            tableName: 'product_requests',
            timestamps: true,
        }
    );
    return ProductRequest;
}
