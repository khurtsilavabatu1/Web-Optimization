import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

console.log('🚀 Order Desk starting — main.jsx loaded')

// შენიშვნა: StrictMode განზრახ არ გამოიყენება — dev რეჟიმში ის ყოველ რენდერს
// ორჯერ იძახებს და Console-ის გამაფრთხილებლების დათვლა რთულდება.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

console.log('✅ Order Desk rendered')
