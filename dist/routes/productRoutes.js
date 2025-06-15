"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
// POST /products: Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, ownerId } = req.body;
        const owner = await user_1.User.findByPk(ownerId);
        if (!owner)
            return res.status(404).json({ error: 'Owner not found' });
        const product = await product_1.Product.create({ name, ownerId });
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});
// GET /products: List all products
router.get('/', async (_req, res) => {
    try {
        const products = await product_1.Product.findAll();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
// GET /products/:id: Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await product_1.Product.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});
// PUT /products/:id: Update product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await product_1.Product.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        await product.update(req.body);
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});
// DELETE /products/:id: Delete product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await product_1.Product.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        await product.destroy();
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});
exports.default = router;
