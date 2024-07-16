import React, { useState } from 'react';

const UpdateDishForm = ({ dish }) => {
  const [dishName, setDishName] = useState(dish.dishName);
  const [imageUrl, setImageUrl] = useState(dish.imageUrl);
  const [isPublished, setIsPublished] = useState(dish.isPublished);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/dishes/${dish._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dishName, imageUrl, isPublished })
      });
      if (!response.ok) {
        throw new Error('Failed to update dish');
      }
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="dishName">Dish Name:</label>
      <input
        type="text"
        id="dishName"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        required
      />
      <br /><br />
      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <br /><br />
      <label htmlFor="isPublished">Published:</label>
      <input
        type="checkbox"
        id="isPublished"
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
      />
      <br /><br />
      <button type="submit">Update Dish</button>
    </form>
  );
};

export default UpdateDishForm;
