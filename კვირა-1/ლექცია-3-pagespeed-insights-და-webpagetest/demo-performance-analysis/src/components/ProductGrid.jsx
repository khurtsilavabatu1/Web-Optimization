/*
  ==========================================
  ProductGrid Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. Renders ALL 200 products at once (no pagination/virtualization)
  2. Heavy calculation on every render
  3. Search without debounce
  4. Full re-render on every keystroke
  5. No React.memo on children
  6. Inline filter logic causes re-computation
*/

import { useState } from 'react'
import ProductCard from './ProductCard'

// Generate product data
const products = [
  { name: 'MacBook Pro', desc: '14" M3 Pro, 18GB RAM, 512GB SSD', basePrice: 2200, category: 'ლეპტოპები' },
  { name: 'iPhone 15 Pro', desc: '256GB, Titanium, A17 Pro ჩიპი', basePrice: 1500, category: 'სმარტფონები' },
  { name: 'AirPods Pro', desc: 'USB-C, Active Noise Cancellation', basePrice: 280, category: 'აქსესუარები' },
  { name: 'iPad Air', desc: '11", M2 ჩიპი, 256GB', basePrice: 950, category: 'ტაბლეტები' },
  { name: 'Samsung S24 Ultra', desc: '512GB, Snapdragon 8 Gen 3', basePrice: 1400, category: 'სმარტფონები' },
  { name: 'Dell XPS 15', desc: '15.6" 4K, i9, 32GB RAM, RTX 4060', basePrice: 2400, category: 'ლეპტოპები' },
  { name: 'Sony WH-1000XM5', desc: 'უსადენო ყურსასმენი, ANC', basePrice: 320, category: 'აქსესუარები' },
  { name: 'Magic Mouse', desc: 'უსადენო თაგუნა, თეთრი', basePrice: 85, category: 'აქსესუარები' },
  { name: 'LG UltraWide', desc: '34" 5K2K, Thunderbolt 4', basePrice: 980, category: 'მონიტორები' },
  { name: 'Logitech MX Keys', desc: 'მექანიკური კლავიატურა', basePrice: 120, category: 'აქსესუარები' },
]

const categories = ['ლეპტოპები', 'სმარტფონები', 'ტაბლეტები', 'აქსესუარები', 'მონიტორები', 'აუდიო']
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
]

const allProducts = []
for (let i = 0; i < 200; i++) {
  const product = products[i % products.length]
  allProducts.push({
    id: i + 1,
    name: `${product.name} #${Math.floor(i / products.length) + 1}`,
    description: product.desc,
    price: Math.round((product.basePrice + Math.random() * 500) * 100) / 100,
    category: categories[i % categories.length],
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    gradient: gradients[i % gradients.length],
  })
}

function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState('')

  // PROBLEM: Heavy calculation on EVERY render (არ არის useMemo)
  console.time('Heavy calculation in ProductGrid render')
  let heavyCalc = 0
  for (let i = 0; i < 8000000; i++) {
    heavyCalc += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
  }
  console.timeEnd('Heavy calculation in ProductGrid render')

  // PROBLEM: Filter on every render without useMemo
  const filtered = allProducts.filter(item => {
    const term = searchTerm.toLowerCase()
    return item.name.toLowerCase().includes(term) ||
           item.description.toLowerCase().includes(term) ||
           item.category.toLowerCase().includes(term)
  })

  // PROBLEM: Sort on every render without useMemo
  filtered.sort((a, b) => b.price - a.price)

  // PROBLEM: Search handler without debounce
  const handleSearch = (e) => {
    const term = e.target.value

    // Heavy calculation on every keystroke
    let calc = 0
    for (let i = 0; i < 5000000; i++) {
      calc += Math.sqrt(i)
    }

    setSearchTerm(term)
    // This causes full re-render of all ProductCards
  }

  return (
    <div className="product-section">
      <h2 className="section-title">
        <i className="fas fa-laptop"></i> ჩვენი პროდუქტები
      </h2>

      <div className="product-filter">
        <input
          type="text"
          id="product-search"
          placeholder="მოძებნე პროდუქტი..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto 20px',
            display: 'block',
            padding: '14px 20px',
            fontSize: '16px',
            border: '2px solid #00ff88',
            borderRadius: '30px',
            background: '#1a1a2e',
            color: 'white'
          }}
        />
      </div>

      <div id="product-count" style={{
        textAlign: 'center',
        marginBottom: '20px',
        color: '#888',
        fontSize: '14px'
      }}>
        ნაჩვენებია {filtered.length} პროდუქტი
      </div>

      {/* PROBLEM: Rendering ALL products at once, no virtualization */}
      <div className="product-grid">
        {filtered.map(product => (
          // PROBLEM: ProductCard არ არის memoized, ყოველთვის re-renders
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// PROBLEM: არ არის React.memo
export default ProductGrid
