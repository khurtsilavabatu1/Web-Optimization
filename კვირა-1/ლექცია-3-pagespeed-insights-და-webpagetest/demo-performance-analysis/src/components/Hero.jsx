/*
  ==========================================
  Hero Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. Large background image without optimization
  2. No width/height — causes CLS
  3. Inline styles computed on every render
  4. Event handlers recreated on every render
*/

function Hero() {
  // PROBLEM: Inline styles computed every render (არ არის useMemo)
  const heroStyle = {
    background: `linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e, #0f3460)`,
    backgroundSize: '400% 400%',
    animation: 'heroGradient 10s ease infinite',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px'
  }

  // PROBLEM: Event handler recreated on every render (არ არის useCallback)
  const handleClick = () => {
    // Heavy calculation on click
    let result = 0
    for (let i = 0; i < 5000000; i++) {
      result += Math.sqrt(i)
    }
    alert('კალათაში დამატებულია!')
  }

  return (
    <div className="hero-section" style={heroStyle}>
      {/* PROBLEM: Large unoptimized background image placeholder */}
      <img
        src="https://picsum.photos/1920/1080?random=1"
        alt="Hero background"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3
        }}
        // PROBLEM: No width/height attributes (CLS)
        // PROBLEM: No loading="lazy"
      />

      <div style={overlayStyle}>
        <p className="hero-pretitle animate__animated animate__fadeInDown">
          უახლესი ტექნოლოგიები საუკეთესო ფასად
        </p>
        <h1 className="animate__animated animate__bounceIn" style={{
          fontSize: '4.5rem',
          color: 'white',
          textShadow: '0 4px 20px rgba(0,255,136,0.5)',
          margin: '15px 0',
          fontWeight: '800'
        }}>
          TechStore
        </h1>
        <p className="hero-subtitle animate__animated animate__fadeInUp" style={{
          color: '#00ff88',
          fontSize: '1.5rem',
          marginBottom: '10px'
        }}>
          ლეპტოპები | სმარტფონები | აქსესუარები
        </p>
        <p className="hero-small-text" style={{
          color: '#666',
          fontSize: '0.9rem',
          marginTop: '10px'
        }}>
          უფასო მიწოდება 200₾-ზე მეტი შეძენისას
        </p>
        <div className="hero-buttons" style={{
          display: 'flex',
          gap: '15px',
          marginTop: '30px'
        }}>
          <a href="#" className="btn-primary" onClick={handleClick}>
            შეძენა
          </a>
          <a href="#" className="btn-secondary">
            კატალოგი
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
