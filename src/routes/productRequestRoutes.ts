import { Router, Request, Response } from 'express';
import { ProductRequest } from '../models/productRequest';
import { Product } from '../models/product';
import { User } from '../models/user';

const router = Router();

// POST /product-request: Request a product
router.post('/', async (req: Request, res: Response) => {
    try {
        const { productId, requestedById } = req.body;
        // Validate product and user existence
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(requestedById);
        if (!product || !user) return res.status(404).json({ error: 'Product or user not found' });
        const request = await ProductRequest.create({ productId, requestedById, status: 'PENDING' });
        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product request' });
    }
});

// POST /product-request/:id/accept: Accept a product request
router.post('/:id/accept', async (req: Request, res: Response) => {
    try {
        const request = await ProductRequest.findByPk(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        request.status = 'ACCEPTED';
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept product request' });
    }
});

export default router;
