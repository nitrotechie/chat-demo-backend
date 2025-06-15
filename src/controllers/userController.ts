import { Request, Response } from 'express';
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

export default class UserController {
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const newUser = await userRepository.saveUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create user', error });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await userRepository.findUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user', error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
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
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user', error });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const result = await userRepository.deleteUser(userId);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user', error });
        }
    }
}