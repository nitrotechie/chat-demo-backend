"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../models/user");
class UserRepository {
    async saveUser(userData) {
        const user = await user_1.User.create(userData);
        return user;
    }
    async findUserById(id) {
        return await user_1.User.findByPk(id);
    }
    async deleteUser(id) {
        const deletedCount = await user_1.User.destroy({ where: { id } });
        return deletedCount > 0;
    }
    async getAllUsers() {
        return await user_1.User.findAll();
    }
}
exports.UserRepository = UserRepository;
