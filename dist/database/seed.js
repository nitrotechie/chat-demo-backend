"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInitialData = seedInitialData;
const user_1 = require("../models/user");
const product_1 = require("../models/product");
async function seedInitialData() {
    // Only seed if there are no users/products
    const userCount = await user_1.User.count();
    const productCount = await product_1.Product.count();
    if (userCount === 0) {
        const user1 = await user_1.User.create({ username: 'alice', email: 'alice@example.com', password: 'password' });
        const user2 = await user_1.User.create({ username: 'bob', email: 'bob@example.com', password: 'password' });
        if (productCount === 0) {
            await product_1.Product.create({ name: 'Laptop', ownerId: user1.id });
            await product_1.Product.create({ name: 'Phone', ownerId: user2.id });
        }
        console.log('Seeded initial users and products.');
    }
}
