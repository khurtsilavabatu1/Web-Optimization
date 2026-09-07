import { useState } from 'react';

// სიმულირებული async API call — ანგარიშის გატანა სალაროში
async function sendBillToRegister(items, total) {
  console.log('🔄 sendBillToRegister() — Starting async operation', { items, total });

  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log('🔄 sendBillToRegister() — Async operation complete');
  return { success: true, billId: Math.random().toString(36).slice(2, 9) };
}

export default function CloseBill({ order, total, perPerson, onBillClosed }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCloseBill = async () => {
    console.log('💳 CloseBill.handleCloseBill() — Entry', { order, total });

    setIsProcessing(true);

    const firstDishName = order[0].name;

    const result = await sendBillToRegister(order, total);

    alert(
      `ანგარიში დახურულია!\n` +
      `ნომერი: ${result.billId}\n` +
      `პირველი კერძი: ${firstDishName}\n` +
      `ჯამი: ${total.toFixed(2)} ₾\n` +
      `თითო ადამიანზე: ${perPerson.toFixed(2)} ₾`
    );

    setIsProcessing(false);
    onBillClosed();

    console.log('💳 CloseBill.handleCloseBill() — Exit');
  };

  return (
    <button
      className="checkout-btn"
      onClick={handleCloseBill}
      disabled={isProcessing}
    >
      {isProcessing ? 'დამუშავება...' : 'ანგარიშის დახურვა'}
    </button>
  );
}
