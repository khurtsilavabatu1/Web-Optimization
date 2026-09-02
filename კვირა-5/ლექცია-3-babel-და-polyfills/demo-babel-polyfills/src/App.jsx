import React from 'react'
import TranspilationDemo from './components/TranspilationDemo'
import PolyfillDemo from './components/PolyfillDemo'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Babel & <span>Polyfills</span></h1>
        <p>
          თანამედროვე JavaScript-ის ფუნქციები, რომლებიც Babel-ით ტრანსპილირდება
          და Polyfill-ებით ემატება ძველ ბრაუზერებს.
        </p>
      </header>

      <main className="container">
        <TranspilationDemo />
        <PolyfillDemo />
      </main>
    </div>
  )
}

export default App
