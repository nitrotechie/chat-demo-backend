import { User, UserAttributes } from '../models/user';

export class UserRepository {
    async saveUser(userData: Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const user = await User.create(userData);
        return user;
    }

    async findUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async deleteUser(id: number): Promise<boolean> {
        const deletedCount = await User.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    }
}