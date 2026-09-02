import { useState } from 'react'
import './ChatWidget.css'

// This component is lazy-loaded only when user clicks the chat button
function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'გამარჯობა! როგორ შემიძლია დაგეხმაროთ?', from: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  console.log('[ChatWidget] Component loaded and rendered at:', performance.now().toFixed(1), 'ms');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      from: 'user'
    };
    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'მადლობა თქვენი შეკითხვისთვის! ეს არის დემო ჩატი.',
        from: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-header-title">
          <div className="chat-status-indicator"></div>
          <span>მხარდაჭერა</span>
        </div>
        <button className="chat-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.from}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="დაწერე შეტყობინება..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="chat-send-btn" onClick={handleSend}>
          ➤
        </button>
      </div>

      <div className="chat-footer">
        Lazy loaded at {performance.now().toFixed(0)}ms
      </div>
    </div>
  )
}

export default ChatWidget
