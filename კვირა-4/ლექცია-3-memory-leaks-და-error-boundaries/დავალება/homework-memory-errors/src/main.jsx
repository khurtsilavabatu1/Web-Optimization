import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

console.log('🚀 Live Ops Console starting — main.jsx loaded')

// შენიშვნა: StrictMode განზრახ არ გამოიყენება — dev რეჟიმში ის ყოველ effect-ს
// ორჯერ უშვებს (mount → cleanup → mount) და memory leak-ების თვლა რთულდება.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

console.log('✅ Live Ops Console rendered')
