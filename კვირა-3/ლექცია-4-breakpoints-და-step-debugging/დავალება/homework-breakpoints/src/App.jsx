import { useState } from 'react';
import MenuList from './components/MenuList';
import Bill from './components/Bill';
import SymptomPanel from './components/SymptomPanel';
import './App.css';

export default function App() {
  const [order, setOrder] = useState([]);
  const [servicePercent, setServicePercent] = useState(15);
  const [people, setPeople] = useState(2);

  const handleAddToBill = (dish, quantity) => {
    console.log('🍽 App.handleAddToBill() — Entry', { dish, quantity });

    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === dish.id);

      if (existingItem) {
        console.log('🍽 App.handleAddToBill() — Updating existing item');
        return prevOrder.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      console.log('🍽 App.handleAddToBill() — Adding new item');
      return [...prevOrder, {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: quantity
      }];
    });

    console.log('🍽 App.handleAddToBill() — Exit');
  };

  const handleUpdateQuantity = (dishId, newQuantity) => {
    console.log('🔢 App.handleUpdateQuantity()', { dishId, newQuantity });

    setOrder(prevOrder =>
      prevOrder.map(item =>
        item.id === dishId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveDish = (dishId) => {
    console.log('🗑️ App.handleRemoveDish()', { dishId });

    setOrder(prevOrder => prevOrder.filter(item => item.id !== dishId));
  };

  const handleClearBill = () => {
    console.log('🧹 App.handleClearBill()');
    setOrder([]);
    setServicePercent(15);
    setPeople(2);
  };

  return (
    <>
      <header className="bug-banner">
        <h1>🐛 დავალება: ეს აპლიკაცია 5 შეცდომას შეიცავს — Breakpoints-ით იპოვეთ და გამოასწორეთ!</h1>
        <p>ქვემოთ მხოლოდ სიმპტომებია — მიზეზი, ფაილი და ხაზი თავად უნდა აღმოაჩინოთ</p>
      </header>

      <div className="container">
        <main className="app-panel">
          <MenuList onAddToBill={handleAddToBill} />
        </main>

        <Bill
          order={order}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveDish={handleRemoveDish}
          onClearBill={handleClearBill}
          servicePercent={servicePercent}
          onChangeService={setServicePercent}
          people={people}
          onChangePeople={setPeople}
        />
      </div>

      <SymptomPanel />
    </>
  );
}
