import { useState } from 'react';

export default function DiscountForm({ onApplyDiscount }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🎟️ DiscountForm.handleSubmit()', { code });

    const validCodes = ['SAVE10', 'SAVE20', 'HALF'];
    const upperCode = code.toUpperCase();

    if (validCodes.includes(upperCode)) {
      onApplyDiscount(upperCode);
      setMessage(`✓ კოდი "${upperCode}" გამოყენებულია`);
      setCode('');
    } else {
      setMessage('✗ არასწორი კოდი');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="discount-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ფასდაკლების კოდი (SAVE10, SAVE20, HALF)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="discount-input"
        />
        <button type="submit" className="discount-btn">
          გამოყენება
        </button>
      </form>
      {message && (
        <div className={`discount-message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
