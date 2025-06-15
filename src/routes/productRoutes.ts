import { Router, Request, Response } from 'express';
import { Product } from '../models/product';
import { User } from '../models/user';

const router = Router();

// POST /products: Create a new product
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, ownerId } = req.body;
        const owner = await User.findByPk(ownerId);
        if (!owner) return res.status(404).json({ error: 'Owner not found' });
        const product = await Product.create({ name, ownerId });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// GET /products: List all products
router.get('/', async (_req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /products/:id: Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// PUT /products/:id: Update product by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /products/:id: Delete product by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        await product.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
