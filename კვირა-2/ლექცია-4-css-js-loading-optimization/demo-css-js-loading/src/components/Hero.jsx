import './Hero.css'

function Hero() {
  console.log('[Hero] Component rendered at:', performance.now().toFixed(1), 'ms');

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">საინფორმაციო პორტალი</h1>
        <p className="hero-subtitle">
          უახლესი სიახლეები ტექნოლოგიების, ბიზნესის და ინოვაციების სამყაროდან
        </p>
        <a href="#news" className="hero-btn">
          წაიკითხე სიახლეები
        </a>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-number">500+</div>
          <div className="stat-label">სტატია</div>
        </div>
        <div className="stat">
          <div className="stat-number">50K+</div>
          <div className="stat-label">მკითხველი</div>
        </div>
        <div className="stat">
          <div className="stat-number">24/7</div>
          <div className="stat-label">განახლება</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
