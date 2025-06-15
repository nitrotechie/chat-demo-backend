"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRequest_1 = require("../models/productRequest");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
// POST /product-request: Request a product
router.post('/', async (req, res) => {
    try {
        const { productId, requestedById } = req.body;
        // Validate product and user existence
        const product = await product_1.Product.findByPk(productId);
        const user = await user_1.User.findByPk(requestedById);
        if (!product || !user)
            return res.status(404).json({ error: 'Product or user not found' });
        const request = await productRequest_1.ProductRequest.create({ productId, requestedById, status: 'PENDING' });
        res.status(201).json(request);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create product request' });
    }
});
// POST /product-request/:id/accept: Accept a product request
router.post('/:id/accept', async (req, res) => {
    try {
        const request = await productRequest_1.ProductRequest.findByPk(req.params.id);
        if (!request)
            return res.status(404).json({ error: 'Request not found' });
        request.status = 'ACCEPTED';
        await request.save();
        res.json(request);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to accept product request' });
    }
});
exports.default = router;
