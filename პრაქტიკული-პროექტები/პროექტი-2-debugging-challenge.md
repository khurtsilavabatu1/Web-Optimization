# მინი-პროექტი 2: Debugging Challenge

**კვირა:** 3-4 (Debugging)  
**დრო:** 2-3 საათი  
**სირთულე:** საშუალო-რთული

---

## კონტექსტი
სტუდენტებს ეძლევათ React აპლიკაცია (Todo + Shopping Cart), რომელიც შეიცავს 10 განზრახ ბაგს. მათი ამოცანაა — DevTools-ისა და debugging ტექნიკების გამოყენებით იპოვონ და გამოასწორონ ყველა ბაგი.

---

## აპლიკაციის კოდი (ბაგებით)

### src/App.jsx:
```jsx
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Debugging Challenge</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('todos')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'todos' ? '#007bff' : '#e9ecef',
            color: activeTab === 'todos' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Todo List
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'cart' ? '#007bff' : '#e9ecef',
            color: activeTab === 'cart' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Shopping Cart
        </button>
      </div>

      {activeTab === 'todos' && <TodoList />}
      {activeTab === 'cart' && <ShoppingCart />}
    </div>
  );
}

export default App;
```

### src/components/TodoList.jsx (5 ბაგი):
```jsx
import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // BUG 1: useEffect-ში localStorage-დან წაკითხვა
  // მინიშნება: რა ხდება თუ localStorage ცარიელია?
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos'));
    setTodos(saved);
  }, []);

  // localStorage-ში შენახვა
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    // BUG 2: ცარიელი todo-ს დამატება შესაძლებელია
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    // BUG 3: state mutation
    todos.push(newTodo);
    setTodos(todos);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed; // BUG 4: direct mutation
        return todo;
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // BUG 5: ფილტრაციის ლოგიკა
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return todo.completed;      // active უნდა აჩვენებდეს !completed
    if (filter === 'completed') return !todo.completed;  // completed უნდა აჩვენებდეს completed
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div>
      <h2>Todo List ({completedCount}/{todos.length} შესრულებული)</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="ახალი todo..."
          style={{ flex: 1, padding: '8px 12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          დამატება
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              background: filter === f ? '#007bff' : '#e9ecef',
              color: filter === f ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {f === 'all' ? 'ყველა' : f === 'active' ? 'აქტიური' : 'შესრულებული'}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#333',
            }}>
              {todo.text}
            </span>
            <small style={{ color: '#999' }}>
              {new Date(todo.createdAt).toLocaleDateString('ka-GE')}
            </small>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ background: '#dc3545', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              წაშლა
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
          {filter === 'all' ? 'Todo list ცარიელია' : `${filter} todo არ არის`}
        </p>
      )}
    </div>
  );
}

export default TodoList;
```

### src/components/ShoppingCart.jsx (5 ბაგი):
```jsx
import React, { useState, useEffect } from 'react';

const PRODUCTS = [
  { id: 1, name: 'ლეპტოპი', price: 2999.99, image: '💻' },
  { id: 2, name: 'სმარტფონი', price: 999.99, image: '📱' },
  { id: 3, name: 'ყურსასმენი', price: 249.99, image: '🎧' },
  { id: 4, name: 'კლავიატურა', price: 149.99, image: '⌨️' },
  { id: 5, name: 'მაუსი', price: 79.99, image: '🖱️' },
];

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    // BUG 6: რა ხდება თუ newQuantity 0 ან უარყოფითია?
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // BUG 7: ჯამის გამოთვლის ლოგიკა
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i <= cart.length; i++) {  // <= ნაცვლად <
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  };

  // BUG 8: ფასდაკლების გამოყენება
  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10);
      setPromoMessage('10% ფასდაკლება გამოყენებულია!');
    } else if (promoCode === 'SAVE20') {
      setDiscount(20);
      setPromoMessage('20% ფასდაკლება გამოყენებულია!');
    } else {
      setDiscount(0);
      setPromoMessage('არასწორი პრომო კოდი');
    }
  };

  // BUG 9: ფასდაკლებული ჯამის გამოთვლა
  const getDiscountedTotal = () => {
    const total = calculateTotal();
    return total - discount; // discount არის %, არა თანხა
  };

  // BUG 10: useEffect dependency - ლოგი ყოველ cart ცვლილებაზე
  useEffect(() => {
    console.log('კალათა განახლდა:', cart);
    console.log('ჯამი:', calculateTotal());
  }); // dependency array არ არის — ყოველ render-ზე გაეშვება

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart ({totalItems} ნივთი)</h2>

      {/* პროდუქტების სია */}
      <div style={{ marginBottom: '30px' }}>
        <h3>პროდუქტები</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {PRODUCTS.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{product.image}</div>
              <h4 style={{ margin: '5px 0' }}>{product.name}</h4>
              <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '18px' }}>${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
              >
                კალათაში დამატება
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* კალათა */}
      {cart.length > 0 && (
        <div style={{ border: '2px solid #007bff', padding: '20px', borderRadius: '8px' }}>
          <h3>თქვენი კალათა</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>{item.image}</span>
                <strong>{item.name}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ padding: '4px 10px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '4px 10px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
                >
                  +
                </button>
                <span style={{ minWidth: '80px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: '4px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* პრომო კოდი */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="პრომო კოდი (SAVE10 ან SAVE20)"
              style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
              onClick={applyPromoCode}
              style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              გამოყენება
            </button>
          </div>
          {promoMessage && <p style={{ color: discount > 0 ? 'green' : 'red', marginTop: '5px' }}>{promoMessage}</p>}

          {/* ჯამი */}
          <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '18px' }}>
            {discount > 0 && (
              <>
                <p>ჯამი: <s>${calculateTotal().toFixed(2)}</s></p>
                <p style={{ color: 'green' }}>ფასდაკლება: {discount}%</p>
              </>
            )}
            <p style={{ fontWeight: 'bold', fontSize: '24px' }}>
              გადასახდელი: ${getDiscountedTotal().toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
```

---

## ბაგების სია (ლექტორისთვის — პასუხები)

### TodoList ბაგები:

| # | ტიპი | აღწერა | გამოსწორება |
|---|------|--------|------------|
| 1 | Runtime | `JSON.parse(null)` → null, `setTodos(null)` → crash | `setTodos(saved \|\| [])` |
| 2 | Logic | ცარიელი todo იმატება | `if (!inputValue.trim()) return;` |
| 3 | Logic | Array mutation — push არ იწვევს re-render | `setTodos([...todos, newTodo])` |
| 4 | Logic | Direct object mutation toggleTodo-ში | `{ ...todo, completed: !todo.completed }` |
| 5 | Logic | ფილტრის ლოგიკა შებრუნებულია | active → `!todo.completed`, completed → `todo.completed` |

### ShoppingCart ბაგები:

| # | ტიპი | აღწერა | გამოსწორება |
|---|------|--------|------------|
| 6 | Logic | quantity 0 ან < 0 შეიძლება | `if (newQuantity < 1) return removeFromCart(productId);` |
| 7 | Runtime | Off-by-one: `i <= cart.length` | `i < cart.length` |
| 8-9 | Logic | discount არის % მაგრამ გამოიკლება როგორც თანხა | `return total * (1 - discount / 100)` |
| 10 | Performance | useEffect dependency array არ არის | `useEffect(() => {...}, [cart])` |

---

## სტუდენტის ინსტრუქცია

1. **არ წაიკითხოთ ბაგების სია!** — თავად იპოვეთ
2. გამოიყენეთ:
   - Chrome DevTools Console (შეცდომების ნახვა)
   - Breakpoints (state-ის ინსპექტირება)
   - React DevTools (კომპონენტის props/state)
   - console.log (საეჭვო ადგილებში)
3. თითოეული ბაგისთვის ჩაწერეთ:
   - რა ტიპის ბაგია (Syntax/Runtime/Logic)
   - როგორ იპოვეთ (რომელი ინსტრუმენტი გამოიყენეთ)
   - რა იყო მიზეზი
   - როგორ გამოასწორეთ
