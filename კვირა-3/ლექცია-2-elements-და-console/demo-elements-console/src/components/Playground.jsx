import { useState } from 'react'

function Playground() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState(['ელემენტი 1', 'ელემენტი 2', 'ელემენტი 3']);

  const handleAddItem = () => {
    const newItem = `ელემენტი ${items.length + 1}`;
    setItems([...items, newItem]);
    console.log('დაემატა:', newItem);
  };

  const handleRemoveItem = () => {
    if (items.length > 0) {
      const removed = items[items.length - 1];
      setItems(items.slice(0, -1));
      console.log('წაიშალა:', removed);
    }
  };

  const handleClick = (e) => {
    setCount(count + 1);
    console.log('Click event:', e);
    console.log('Click count:', count + 1);
  };

  return (
    <section className="playground">
      <h2 className="section-title">ინტერაქტიული Playground</h2>
      <p className="section-description">
        ეს არის ინტერაქტიული სივრცე Elements და Console პანელების პრაქტიკისთვის.
        მანიპულირება გაუკეთეთ ელემენტებს DevTools-ით!
      </p>

      <div className="playground-grid">
        {/* Counter Card */}
        <div className="demo-card" data-component="counter">
          <h3 className="demo-card-title">მთვლელი</h3>
          <div className="counter-display" data-count={count}>
            {count}
          </div>
          <div className="demo-card-actions">
            <button
              className="demo-btn primary"
              onClick={handleClick}
              id="test-button"
            >
              ინტერაქციის ტესტი
            </button>
            <button
              className="demo-btn secondary"
              onClick={() => setCount(0)}
            >
              განულება
            </button>
          </div>
          <div className="demo-hint">
            💡 Console-ში ჩაწერეთ: monitorEvents($0, 'click')
          </div>
        </div>

        {/* Input Card */}
        <div className="demo-card" data-component="input">
          <h3 className="demo-card-title">ტექსტის ინპუტი</h3>
          <input
            type="text"
            className="demo-input"
            placeholder="ჩაწერეთ რამე..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            data-char-count={text.length}
          />
          <div className="input-info">
            სიმბოლოების რაოდენობა: <span className="char-count">{text.length}</span>
          </div>
          <div className="demo-hint">
            💡 Elements panel-ში იხილეთ data-char-count ატრიბუტის ცვლილება
          </div>
        </div>

        {/* Dynamic List Card */}
        <div className="demo-card" data-component="list">
          <h3 className="demo-card-title">დინამიური სია</h3>
          <ul className="dynamic-list" data-item-count={items.length}>
            {items.map((item, index) => (
              <li key={index} className="list-item" data-index={index}>
                {item}
              </li>
            ))}
          </ul>
          <div className="demo-card-actions">
            <button className="demo-btn success" onClick={handleAddItem}>
              + დამატება
            </button>
            <button className="demo-btn danger" onClick={handleRemoveItem}>
              - წაშლა
            </button>
          </div>
          <div className="demo-hint">
            💡 Console-ში ჩაწერეთ: $$('.list-item')
          </div>
        </div>

        {/* Status Card */}
        <div className="demo-card status-card" data-component="status">
          <h3 className="demo-card-title">სტატუსის ინდიკატორი</h3>
          <div className="status-indicators">
            <div className="status-badge success">აქტიური</div>
            <div className="status-badge warning">მოლოდინში</div>
            <div className="status-badge danger">შეცდომა</div>
          </div>
          <div className="demo-hint">
            💡 Elements-ში შეცვალეთ ბეჯების კლასები და ფერები
          </div>
        </div>
      </div>
    </section>
  );
}

export default Playground;
