const express = require('express');
const router = express.Router();
const Dish = require('../models/dishes');

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find({isPublished: true});
    res.json(dishes);
  } catch (err) {
    console.error('Failed to fetch dishes', err);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
});

router.post('/', async (req, res) => {
  const { dishId, dishName, imageUrl, isPublished } = req.body;

  try {
    const newDish = await Dish.create({
      dishId,
      dishName,
      imageUrl,
      isPublished: !!isPublished,
    });

    res.status(201).json(newDish);
  } catch (error) {
    console.error("Error inserting dish:", error);
    res.status(500).json({ error: "Failed to insert dish" });
  }
});

router.put('/:id', async (req, res) => {
  const { isPublished } = req.body;
  try {
    console.log('Updating dish with ID:', req.params.id);
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    console.log('Updated dish:', updatedDish);
    res.json(updatedDish);
  } catch (err) {
    console.error('Failed to update dish', err);
    res.status(500).json({ error: 'Failed to update dish' });
  }
});

module.exports = router;
