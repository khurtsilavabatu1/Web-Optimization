import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

console.log('🚀 Support Inbox starting — main.jsx loaded')

// შენიშვნა: StrictMode განზრახ არ გამოიყენება — dev რეჟიმში ის ყოველ რენდერს
// ორჯერ იძახებს და render badge-ების რიცხვები აღარ ემთხვევა ინტერაქციების რაოდენობას.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

console.log('✅ Support Inbox rendered')
