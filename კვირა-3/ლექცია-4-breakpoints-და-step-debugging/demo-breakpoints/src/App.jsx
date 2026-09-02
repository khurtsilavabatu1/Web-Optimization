import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ExercisePanel from './components/ExercisePanel';
import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState('');

  const handleAddToCart = (product, quantity) => {
    console.log('🛒 App.handleAddToCart() — Entry', { product, quantity });

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        console.log('🛒 App.handleAddToCart() — Updating existing item');
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log('🛒 App.handleAddToCart() — Adding new item');
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        }];
      }
    });

    console.log('🛒 App.handleAddToCart() — Exit');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    console.log('🔢 App.handleUpdateQuantity()', { productId, newQuantity });

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    console.log('🗑️ App.handleRemoveItem()', { productId });

    // BUG #3: filters cart but never updates state — UI won't re-render
    cart.filter(item => item.id !== productId);
  };

  const handleClearCart = () => {
    console.log('🧹 App.handleClearCart()');
    setCart([]);
    setDiscountCode('');
  };

  const handleApplyDiscount = (code) => {
    console.log('🎟️ App.handleApplyDiscount()', { code });
    setDiscountCode(code);
  };

  return (
    <>
      <header className="bug-banner">
        <h1>🐛 ეს აპლიკაცია შეცდომებს შეიცავს — Breakpoints-ით იპოვეთ და გამოასწორეთ!</h1>
      </header>

      <div className="container">
        <main className="app-panel">
          <ProductList onAddToCart={handleAddToCart} />
        </main>

        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          discountCode={discountCode}
          onApplyDiscount={handleApplyDiscount}
        />
      </div>

      <ExercisePanel />
    </>
  );
}
