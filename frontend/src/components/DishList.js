
import React from 'react';
import UpdateDishForm from './UpdateDishForm';

const DishList = ({ dishes }) => {
  return (
    <div>
      {dishes.map(dish => (
        <div key={dish._id}>
          <h3>{dish.dishName}</h3>
          <img src={dish.imageUrl} alt={dish.dishName} style={{ width: '100px', height: '100px' }} />
          <p>{dish.isPublished ? 'Published' : 'Not Published'}</p>
          <UpdateDishForm dish={dish} />
        </div>
      ))}
    </div>
  );
};

export default DishList;
