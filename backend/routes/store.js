
const express = require('express');
const Store = require('../models/Store');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

// Add new store (Admin only)
router.post('/add', authenticateUser, async (req, res) => {
    const { name, address } = req.body;
    const store = new Store({ name, address });
    await store.save();
    res.status(201).json(store);
});

// Get all stores (Public)
router.get('/', async (req, res) => {
    const stores = await Store.find();
    res.json(stores);
});




router.post('/:id/rate', async (req, res) => {
  const { userId, rating } = req.body; // Extract userId and rating from request body
  const storeId = req.params.id; // Get store id from route parameters

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const store = await Store.findById(storeId); // Use storeId instead of id
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Ensure store.ratings is an array
    if (!Array.isArray(store.ratings)) {
      store.ratings = [];
    }

    // Check if the user has already rated this store
    const existingRating = store.ratings.find(
      r => r.userId && r.userId.equals(userId) // Compare userId (from body)
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add new rating
      store.ratings.push({ userId, rating });
    }

    // Save store with updated ratings
    store.averageRating = store.getAverageRating(); // Update average rating
    await store.save();

    res.status(200).json({ message: 'Rating submitted successfully', averageRating: store.averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating rating' });
  }
});

module.exports = router;


  
module.exports = router;
