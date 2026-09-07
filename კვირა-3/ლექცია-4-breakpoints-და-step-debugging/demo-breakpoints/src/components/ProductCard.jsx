import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => {
    console.log('➖ handleMinus() — Entry', { currentQuantity: quantity });

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

    console.log('➖ handleMinus() — Exit');
  };

  const handlePlus = () => {
    console.log('➕ handlePlus() — Entry', { currentQuantity: quantity });

    if (quantity < 99) {
      setQuantity(quantity + 1);
    }

    console.log('➕ handlePlus() — Exit', { newQuantity: quantity < 99 ? quantity + 1 : quantity });
  };

  const handleAddToCart = () => {
    console.log('🛒 handleAddToCart() — Entry', { product, quantity });
    // BUG #2: always sends 1 instead of the selected quantity
    onAddToCart(product, quantity);
    console.log('🛒 handleAddToCart() — Exit');
  };

  const getCategoryClass = (category) => {
    const classes = {
      'აქსესუარები': 'accessories',
      'ელექტრონიკა': 'electronics',
      'სათამაშოები': 'toys'
    };
    return classes[category] || 'accessories';
  };

  return (
    <div className="product-card">
      <div className="product-image" style={{ background: product.color }}></div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-price">{product.price.toFixed(2)} ₾</span>
        <span className={`category-badge ${getCategoryClass(product.category)}`}>
          {product.category}
        </span>
      </div>

      <div className="product-controls">
        <div className="quantity-selector">
          <button className="qty-btn qty-minus" onClick={handleMinus}>−</button>
          <span className="quantity-display">{quantity}</span>
          <button className="qty-btn qty-plus" onClick={handlePlus}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          კალათაში დამატება
        </button>
      </div>
    </div>
  );
}
