

const express = require('express');
const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};


router.get('/dashboard', authenticateUser, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStores = await Store.countDocuments();
        const totalRatings = await Rating.countDocuments();

        res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.post('/addstore', authenticateUser, isAdmin, async (req, res) => {
    const { name, address } = req.body;

    try {
        const newStore = new Store({ name, address });
        await newStore.save();
        res.status(201).json({ message: 'Store added successfully', store: newStore });
    } catch (error) {
        res.status(500).json({ message: 'Error adding store', error });
    }
});


router.post('/adduser', authenticateUser, isAdmin, async (req, res) => {
    const { name, email, password, address, role } = req.body;
    console.log(req.body);
    

    try {
        // Directly store the password without hashing
        const newUser = new User({ name, email, password, address, role });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

module.exports = router;
