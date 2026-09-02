import { useState, useRef, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import CartSummary from './components/CartSummary'

// ===== სამაგალითო პროდუქტები =====
const initialProducts = [
  { id: 1,  name: 'ლეპტოპი',        price: 2499, inStock: true,  category: 'ელექტრონიკა' },
  { id: 2,  name: 'ტელეფონი',        price: 1299, inStock: true,  category: 'ელექტრონიკა' },
  { id: 3,  name: 'ყურსასმენი',      price: 199,  inStock: true,  category: 'აქსესუარები' },
  { id: 4,  name: 'მაუსი',           price: 49,   inStock: false, category: 'აქსესუარები' },
  { id: 5,  name: 'კლავიატურა',      price: 89,   inStock: true,  category: 'აქსესუარები' },
  { id: 6,  name: 'მონიტორი',        price: 599,  inStock: true,  category: 'ელექტრონიკა' },
  { id: 7,  name: 'ვებკამერა',       price: 79,   inStock: false, category: 'აქსესუარები' },
  { id: 8,  name: 'პლანშეტი',        price: 899,  inStock: true,  category: 'ელექტრონიკა' },
  { id: 9,  name: 'დამტენი',         price: 29,   inStock: true,  category: 'აქსესუარები' },
  { id: 10, name: 'სმარტ საათი',     price: 349,  inStock: false, category: 'ელექტრონიკა' },
]

function App() {
  const renderCount = useRef(0)
  renderCount.current++

  const [products] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    console.log('🎯 App component mounted')
    return () => {
      console.log('👋 App component will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔍 Search term changed:', searchTerm)
  }, [searchTerm])

  useEffect(() => {
    console.log('🛒 Cart items changed. Total items:', cartItems.length)
  }, [cartItems])

  // ფილტრაცია ძიებით — ყოველ აკრეფაზე ხელახლა ეშვება (არ არის useMemo)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // კალათაში დამატება — ყოველ ჯერზე ახალი ფუნქცია იქმნება (არ არის useCallback)
  const handleAddToCart = (product) => {
    console.log('➕ Adding to cart:', product.name)
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id)
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  // კალათიდან წაშლა
  const handleRemoveFromCart = (productId) => {
    console.log('➖ Removing from cart, product ID:', productId)
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // კალათის გასუფთავება
  const handleClearCart = () => {
    console.log('🗑️ Clearing entire cart')
    setCartItems([])
  }

  console.log('🔄 App component rendering. Render count:', renderCount.current)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Dashboard</h1>
        <span className="render-badge header-badge" title="App კომპონენტის რენდერების რაოდენობა">
          App renders: {renderCount.current}
        </span>
        <p className="app-subtitle">
          React DevTools-ის სავარჯიშო — დააკვირდით რენდერების რაოდენობას!
        </p>
      </header>
      <div className="app-layout">
        <div className="main-content">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
        <aside className="sidebar">
          <CartSummary
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        </aside>
      </div>
    </div>
  )
}

export default App
