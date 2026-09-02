function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">
          თანამედროვე ვებ ტექნოლოგიები
        </h1>
        <p className="hero-subtitle">
          გაეცანით უახლეს ტრენდებს ვებ დეველოპმენტში, მიიღეთ პრაქტიკული რჩევები და გაიზიარეთ გამოცდილება
        </p>
        <div className="hero-actions">
          <a href="#articles" className="btn btn-primary">სტატიების ნახვა</a>
          <a href="#newsletter" className="btn btn-secondary">გამოწერა</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-illustration">
          <div className="illustration-circle circle-1"></div>
          <div className="illustration-circle circle-2"></div>
          <div className="illustration-circle circle-3"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
