/*
  ==========================================
  ProductCard Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. No React.memo
  2. Heavy calculation on every render
  3. Unoptimized image from picsum.photos
  4. No lazy loading
  5. Event handlers recreated on every render
  6. Inline styles computed on every render
*/

function ProductCard({ product }) {
  // PROBLEM: Heavy calculation on EVERY render
  let calc = 0
  for (let j = 0; j < 10000; j++) {
    calc += Math.sqrt(j)
  }

  // PROBLEM: Stars calculation on every render (არ არის useMemo)
  const stars = '★'.repeat(Math.floor(product.rating)) +
                (product.rating % 1 >= 0.5 ? '½' : '')

  // PROBLEM: Inline style computed on every render
  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: `0 4px 15px rgba(0,255,136,0.1)`,
    transition: 'all 0.3s',
    border: '1px solid #1a1a2e'
  }

  // PROBLEM: Event handler recreated on every render
  const handleMouseEnter = () => {
    // Heavy calculation on mouse enter
    let result = 0
    for (let i = 0; i < 8000000; i++) {
      result += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
    }
  }

  const handleClick = () => {
    let result = 0
    for (let i = 0; i < 5000000; i++) {
      result += Math.sqrt(i)
    }
    alert(`${product.name} დაემატა კალათაში!`)
  }

  return (
    <div
      className="product-card"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
    >
      {/* PROBLEM: Large unoptimized image, no lazy loading, no dimensions */}
      <img
        src={`https://picsum.photos/400/300?random=${product.id}`}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          background: product.gradient
        }}
        // PROBLEM: No width/height attributes (CLS)
        // PROBLEM: No loading="lazy"
      />

      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '1.1rem',
          marginBottom: '8px',
          color: '#0a0a0a',
          fontWeight: '700'
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#666',
          marginBottom: '12px',
          minHeight: '40px'
        }}>
          {product.description}
        </p>
        <div style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#00ff88',
          marginBottom: '8px'
        }}>
          ₾{product.price.toFixed(2)}
        </div>
        <div style={{
          color: '#ffd700',
          fontSize: '0.9rem',
          marginBottom: '8px'
        }}>
          {stars} ({product.rating})
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: '#888',
          marginBottom: '12px'
        }}>
          {product.category}
        </div>
        <button
          onClick={handleClick}
          style={{
            width: '100%',
            padding: '10px',
            background: '#00ff88',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          კალათაში დამატება
        </button>
      </div>
    </div>
  )
}

// PROBLEM: არ არის React.memo
export default ProductCard
