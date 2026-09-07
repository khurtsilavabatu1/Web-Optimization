import { useState } from 'react';
import { nextQuantity, prevQuantity } from '../utils/billing';

export default function MenuCard({ dish, onAddToBill }) {
  // საწყისი მნიშვნელობა input-იდან მოდის — ამიტომ ტექსტია
  const [quantity, setQuantity] = useState('1');

  const handleMinus = () => {
    console.log('➖ MenuCard.handleMinus() — Entry', { quantity });
    setQuantity(prevQuantity(quantity));
    console.log('➖ MenuCard.handleMinus() — Exit');
  };

  const handlePlus = () => {
    console.log('➕ MenuCard.handlePlus() — Entry', { quantity });
    setQuantity(nextQuantity(quantity));
    console.log('➕ MenuCard.handlePlus() — Exit');
  };

  const handleAddToBill = () => {
    console.log('🍽 MenuCard.handleAddToBill() — Entry', { dish, quantity });
    onAddToBill(dish, Number(quantity));
    console.log('🍽 MenuCard.handleAddToBill() — Exit');
  };

  const getCategoryClass = (category) => {
    const classes = {
      'სალათები': 'starters',
      'ცხელი კერძები': 'mains',
      'დესერტი': 'desserts',
      'ცომეული': 'desserts'
    };
    return classes[category] || 'starters';
  };

  return (
    <div className="dish-card">
      <div className="dish-image" style={{ background: dish.color }}></div>

      <div className="dish-info">
        <h3 className="dish-name">{dish.name}</h3>
        <span className="dish-price">{dish.price.toFixed(2)} ₾</span>
        <span className={`category-badge ${getCategoryClass(dish.category)}`}>
          {dish.category}
        </span>
      </div>

      <div className="dish-controls">
        <div className="quantity-selector">
          <button className="qty-btn qty-minus" onClick={handleMinus}>−</button>
          <span className="quantity-display">{quantity}</span>
          <button className="qty-btn qty-plus" onClick={handlePlus}>+</button>
        </div>
        <button className="add-to-bill-btn" onClick={handleAddToBill}>
          ანგარიშში დამატება
        </button>
      </div>
    </div>
  );
}
