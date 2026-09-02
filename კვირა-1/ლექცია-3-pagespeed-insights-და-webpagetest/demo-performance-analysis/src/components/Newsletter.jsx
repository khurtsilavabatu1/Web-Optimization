/*
  ==========================================
  Newsletter Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. No form element (accessibility issue)
  2. No labels (accessibility issue)
  3. Heavy calculation on submit
  4. Event handler recreated on every render
*/

function Newsletter() {
  // PROBLEM: Event handler recreated on every render (არ არის useCallback)
  const handleSubmit = (e) => {
    e.preventDefault()

    // Heavy calculation on submit
    let result = 0
    for (let i = 0; i < 8000000; i++) {
      result += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
    }

    alert('გამოწერა წარმატებით დასრულდა!')
  }

  return (
    <div className="newsletter-section" style={{
      background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '15px',
        color: '#0a0a0a'
      }}>
        გამოიწერე სიახლეები
      </h2>
      <p style={{
        fontSize: '1.1rem',
        marginBottom: '30px',
        color: '#1a1a2e'
      }}>
        მიიღე ინფორმაცია ახალი პროდუქტებისა და სპეციალური შეთავაზებების შესახებ
      </p>

      {/* PROBLEM: არ არის form element */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
        gap: '10px'
      }}>
        {/* PROBLEM: არ არის label */}
        <input
          type="email"
          placeholder="ელ. ფოსტა"
          style={{
            flex: 1,
            padding: '14px 20px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            background: 'white',
            color: '#0a0a0a'
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '14px 30px',
            background: '#0a0a0a',
            color: '#00ff88',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          გამოწერა
        </button>
      </div>
    </div>
  )
}

// PROBLEM: არ არის React.memo
export default Newsletter
