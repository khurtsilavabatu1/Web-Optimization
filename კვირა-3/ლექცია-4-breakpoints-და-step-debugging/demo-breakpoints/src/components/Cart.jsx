import CartItem from './CartItem';
import DiscountForm from './DiscountForm';
import Checkout from './Checkout';
import { calculateSubtotal, applyDiscount, calculateTax, calculateTotal } from '../utils/calculations';

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onClearCart, discountCode, onApplyDiscount }) {
  console.log('🛒 Cart.render()', { cartLength: cart.length, discountCode });

  const subtotal = calculateSubtotal(cart);
  const discount = applyDiscount(subtotal, discountCode);
  const taxableAmount = subtotal - discount;
  const tax = calculateTax(taxableAmount);
  const total = calculateTotal(subtotal, discount, tax);

  const handleCheckoutComplete = () => {
    console.log('✅ Cart.handleCheckoutComplete()');
    onClearCart();
  };

  return (
    <aside className="cart-sidebar">
      <h3>კალათა</h3>

      <div id="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">კალათა ცარიელია</p>
        ) : (
          cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      <DiscountForm onApplyDiscount={onApplyDiscount} />

      <div className="cart-summary">
        <div className="summary-row">
          <span>ქვეჯამი:</span>
          <span>{subtotal.toFixed(2)} ₾</span>
        </div>

        {discount > 0 && (
          <div className="summary-row discount-row">
            <span>ფასდაკლება ({discountCode}):</span>
            <span>−{discount.toFixed(2)} ₾</span>
          </div>
        )}

        <div className="summary-row">
          <span>გადასახადი (18%):</span>
          <span>{tax.toFixed(2)} ₾</span>
        </div>

        <div className="summary-row total-row">
          <span>ჯამი:</span>
          <span>{total.toFixed(2)} ₾</span>
        </div>
      </div>

      <div className="cart-actions">
        <Checkout
          cart={cart}
          total={total}
          onCheckoutComplete={handleCheckoutComplete}
        />
        <button className="clear-cart-btn" onClick={onClearCart}>
          კალათის გასუფთავება
        </button>
      </div>
    </aside>
  );
}
