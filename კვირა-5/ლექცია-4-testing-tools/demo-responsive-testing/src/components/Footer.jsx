function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">TechBlog</h3>
          <p className="footer-description">
            თანამედროვე ვებ ტექნოლოგიების შესახებ ქართულ ენაზე
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">სწრაფი ბმულები</h4>
          <ul className="footer-links">
            <li><a href="#home">მთავარი</a></li>
            <li><a href="#articles">სტატიები</a></li>
            <li><a href="#about">ჩვენს შესახებ</a></li>
            <li><a href="#contact">კონტაქტი</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">კატეგორიები</h4>
          <ul className="footer-links">
            <li><a href="#react">React</a></li>
            <li><a href="#css">CSS</a></li>
            <li><a href="#javascript">JavaScript</a></li>
            <li><a href="#performance">Performance</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">სოციალური</h4>
          <ul className="footer-links">
            <li><a href="#github">GitHub</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
            <li><a href="#youtube">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} TechBlog. ყველა უფლება დაცულია.</p>
      </div>
    </footer>
  )
}

export default Footer
