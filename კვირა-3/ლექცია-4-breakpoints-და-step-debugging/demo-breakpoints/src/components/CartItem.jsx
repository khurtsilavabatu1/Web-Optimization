export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleIncrease = () => {
    console.log('➕ CartItem.handleIncrease()', { item, currentQty: item.quantity });
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    console.log('➖ CartItem.handleDecrease()', { item, currentQty: item.quantity });
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    console.log('🗑️ CartItem.handleRemove()', { item });
    onRemove(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-qty">
          {item.quantity} x {item.price.toFixed(2)} ₾
        </span>
      </div>
      <div className="cart-item-actions">
        <div className="cart-qty-controls">
          <button className="cart-qty-btn" onClick={handleDecrease}>−</button>
          <span className="cart-qty-display">{item.quantity}</span>
          <button className="cart-qty-btn" onClick={handleIncrease}>+</button>
        </div>
        <span className="cart-item-total">{itemTotal.toFixed(2)} ₾</span>
        <button className="remove-item-btn" onClick={handleRemove}>×</button>
      </div>
    </div>
  );
}
