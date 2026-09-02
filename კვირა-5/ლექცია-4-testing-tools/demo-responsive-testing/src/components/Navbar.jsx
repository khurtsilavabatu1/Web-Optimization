import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          TechBlog
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="მენიუს გახსნა"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>მთავარი</a></li>
          <li><a href="#articles" onClick={() => setIsMenuOpen(false)}>სტატიები</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ჩვენს შესახებ</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>კონტაქტი</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
