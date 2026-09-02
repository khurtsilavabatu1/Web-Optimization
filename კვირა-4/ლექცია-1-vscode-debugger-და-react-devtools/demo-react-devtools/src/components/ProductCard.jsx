import { useRef, useEffect } from 'react'

// შენიშვნა: არანაირი React.memo — ყოველ state ცვლილებაზე ხელახლა რენდერდება
function ProductCard({ product, onAddToCart }) {
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log(`🎴 ProductCard (${product.name}) mounted`)
    return () => {
      console.log(`👋 ProductCard (${product.name}) will unmount`)
    }
  }, [product.name])

  useEffect(() => {
    console.log(`🔄 ProductCard (${product.name}) re-rendered. Render count:`, renderCount.current)
  })

  return (
    <div className="product-card">
      <span className="render-badge" title="რენდერების რაოდენობა">
        renders: {renderCount.current}
      </span>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
        <div className="product-price">{product.price} &#8382;</div>
        <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'მარაგშია' : 'არ არის მარაგში'}
        </span>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
        disabled={!product.inStock}
      >
        {product.inStock ? 'კალათაში დამატება' : 'არ არის ხელმისაწვდომი'}
      </button>
    </div>
  )
}

export default ProductCard
