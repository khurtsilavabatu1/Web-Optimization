import { useRef, useEffect } from 'react'
import ProductCard from './ProductCard'

// შენიშვნა: არანაირი React.memo — ყოველ state ცვლილებაზე ხელახლა რენდერდება
function ProductList({ products, onAddToCart }) {
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log('📋 ProductList mounted')
    return () => {
      console.log('👋 ProductList will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 ProductList re-rendered. Render count:', renderCount.current, '| Products count:', products.length)
  })

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>პროდუქტები ({products.length})</h2>
        <span className="render-badge" title="რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
      </div>
      {products.length === 0 ? (
        <div className="empty-state">პროდუქტი ვერ მოიძებნა</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
