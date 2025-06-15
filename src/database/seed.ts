import { User } from '../models/user';
import { Product } from '../models/product';

export async function seedInitialData() {
    // Only seed if there are no users/products
    const userCount = await User.count();
    const productCount = await Product.count();
    if (userCount === 0) {
        const user1 = await User.create({ username: 'alice', email: 'alice@example.com', password: 'password' });
        const user2 = await User.create({ username: 'bob', email: 'bob@example.com', password: 'password' });
        if (productCount === 0) {
            await Product.create({ name: 'Laptop', ownerId: user1.id });
            await Product.create({ name: 'Phone', ownerId: user2.id });
        }
        console.log('Seeded initial users and products.');
    }
}
