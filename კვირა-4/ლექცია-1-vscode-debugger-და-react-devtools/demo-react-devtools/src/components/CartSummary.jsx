import { useRef, useEffect } from 'react'

// შენიშვნა: არანაირი React.memo — ყოველ state ცვლილებაზე ხელახლა რენდერდება
function CartSummary({ cartItems, onRemoveFromCart, onClearCart }) {
  const renderCount = useRef(0)
  renderCount.current++

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    console.log('🛒 CartSummary mounted')
    return () => {
      console.log('👋 CartSummary will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 CartSummary re-rendered. Render count:', renderCount.current, '| Cart items:', cartItems.length)
  })

  return (
    <div className="cart-summary">
      <div className="cart-header">
        <h2>კალათა</h2>
        <span className="render-badge" title="რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
      </div>
      {cartItems.length === 0 ? (
        <p className="cart-empty">კალათა ცარიელია</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-qty">x{item.quantity}</span>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-price">{item.price * item.quantity} &#8382;</span>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                    title="წაშლა"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div className="cart-total">
              <span>სულ: {totalItems} ერთეული</span>
              <strong>{totalPrice} &#8382;</strong>
            </div>
            <button className="clear-cart-btn" onClick={onClearCart}>
              კალათის გასუფთავება
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSummary
