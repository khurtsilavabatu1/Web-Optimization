import { useState } from 'react';

// Simulated async API call
async function processCheckout(cartItems, total) {
  console.log('🔄 processCheckout() — Starting async operation', { cartItems, total });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('🔄 processCheckout() — Async operation complete');
  return { success: true, orderId: Math.random().toString(36).substr(2, 9) };
}

export default function Checkout({ cart, total, onCheckoutComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    console.log('💳 Checkout.handleCheckout() — Entry', { cart, total });
     if (cart.length === 0) {
    alert('კალათა ცარიელია! ჯერ პროდუქტი დაამატეთ.');
    return;
  }
    // BUG #4: No empty cart validation — cart[0] is undefined when cart is empty
    setIsProcessing(true);

    const firstItemName = cart[0].name;

    processCheckout(cart, total);

    alert(`შეკვეთა გაფორმებულია!\nპირველი ნივთი: ${firstItemName}\nჯამი: ${total.toFixed(2)} ₾`);
    setIsProcessing(false);
    onCheckoutComplete();

    console.log('💳 Checkout.handleCheckout() — Exit');
  };

  return (
    <button
      className="checkout-btn"
      onClick={handleCheckout}
      disabled={isProcessing}
    >
      {isProcessing ? 'დამუშავება...' : 'შეკვეთის გაფორმება'}
    </button>
  );
}
