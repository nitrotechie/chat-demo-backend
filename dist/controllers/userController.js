"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../repositories/userRepository");
const userRepository = new userRepository_1.UserRepository();
class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await userRepository.saveUser(userData);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to create user', error });
        }
    }
    async getUser(req, res) {
        try {
            const userId = Number(req.params.id);
            const user = await userRepository.findUserById(userId);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to get user', error });
        }
    }
    async updateUser(req, res) {
        try {
            const userId = Number(req.params.id);
            const updatedData = req.body;
            const user = await userRepository.findUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            await user.update(updatedData);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to update user', error });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = Number(req.params.id);
            const result = await userRepository.deleteUser(userId);
            if (result) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to delete user', error });
        }
    }
}
exports.default = UserController;
