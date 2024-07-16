const express = require('express');
const router = express.Router();
const Dish = require('../models/dishes');

router.post('/', async (req, res) => {
  const { dishId, dishName, imageUrl, isPublished } = req.body;

  const newDish = new Dish({
    dishId,
    dishName,
    imageUrl,
    isPublished
  });
app.post('/publish', (req, res) => {
    const { id } = req.body;
    const dish = dishes.find(d => d.id === id);
    if (dish) {
        dish.published = true;
        res.status(200).send('Dish published successfully');
    } else {
        res.status(404).send('Dish not found');
    }
});

app.post('/unpublish', (req, res) => {
    const { id } = req.body;
    const dish = dishes.find(d => d.id === id);
    if (dish) {
        dish.published = false;
        res.status(200).send('Dish unpublished successfully');
    } else {
        res.status(404).send('Dish not found');
    }
});

  try {
    const savedDish = await newDish.save();
    res.json(savedDish);
  } catch (err) {
    console.error('Failed to save dish', err);
    res.status(500).json({ error: 'Failed to save dish' });
  }
});

module.exports = router;
