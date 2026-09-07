export default function BillItem({ item, onUpdateQuantity, onRemove }) {
  const handleIncrease = () => {
    console.log('➕ BillItem.handleIncrease()', { item, currentQty: item.quantity });
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    console.log('➖ BillItem.handleDecrease()', { item, currentQty: item.quantity });
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    console.log('🗑️ BillItem.handleRemove()', { item });
    onRemove(item.dishId);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bill-item">
      <div className="bill-item-info">
        <span className="bill-item-name">{item.name}</span>
        <span className="bill-item-qty">
          {item.quantity} x {item.price.toFixed(2)} ₾
        </span>
      </div>
      <div className="bill-item-actions">
        <div className="bill-qty-controls">
          <button className="bill-qty-btn" onClick={handleDecrease}>−</button>
          <span className="bill-qty-display">{item.quantity}</span>
          <button className="bill-qty-btn" onClick={handleIncrease}>+</button>
        </div>
        <span className="bill-item-total">{itemTotal.toFixed(2)} ₾</span>
        <button className="remove-item-btn" onClick={handleRemove}>×</button>
      </div>
    </div>
  );
}
