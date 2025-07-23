const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new product (admin only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const { name, category, price, description } = req.body;
        
        const product = new Product({
            name,
            category,
            price: parseFloat(price),
            description,
            image: req.file ? req.file.path : ''
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product (admin only)
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    try {
        const { name, category, price, description } = req.body;
        const updates = {
            name,
            category,
            price: parseFloat(price),
            description
        };

        if (req.file) {
            updates.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
