/*
  ==========================================
  Footer Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. Low contrast text
  2. No semantic HTML
  3. Inline styles on every render
*/

function Footer() {
  return (
    <div className="footer-section" style={{
      background: '#0a0a0a',
      padding: '50px 20px 20px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <div>
          <h4 style={{
            color: '#00ff88',
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            TechStore
          </h4>
          <p style={{
            // PROBLEM: Low contrast
            color: '#1a1a1a',
            fontSize: '0.9rem',
            marginBottom: '6px',
            lineHeight: '1.6'
          }}>
            ტექნოლოგიური პროდუქტები საუკეთესო ფასად
          </p>
        </div>

        <div>
          <h4 style={{
            color: '#00ff88',
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            სამუშაო საათები
          </h4>
          <p style={{ color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
            ორშაბათი — პარასკევი: 10:00 — 20:00
          </p>
          <p style={{ color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
            შაბათი — კვირა: 11:00 — 18:00
          </p>
        </div>

        <div>
          <h4 style={{
            color: '#00ff88',
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            კონტაქტი
          </h4>
          <p style={{ color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
            ვაჟა-ფშაველას 76, თბილისი
          </p>
          <p style={{ color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
            +995 555 12 34 56
          </p>
          <p style={{ color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
            info@techstore.ge
          </p>
        </div>

        <div>
          <h4 style={{
            color: '#00ff88',
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            სოციალური ქსელები
          </h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{
            // PROBLEM: Low contrast
            color: '#2a2a2a',
            display: 'block',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '6px'
          }}>
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{
            color: '#2a2a2a',
            display: 'block',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '6px'
          }}>
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{
            color: '#2a2a2a',
            display: 'block',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '6px'
          }}>
            Twitter
          </a>
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        // PROBLEM: Very low contrast
        color: '#1a1a1a',
        fontSize: '0.85rem',
        borderTop: '1px solid #1a1a1a',
        paddingTop: '20px'
      }}>
        TechStore 2024. ყველა უფლება დაცულია.
      </p>
    </div>
  )
}

// PROBLEM: არ არის React.memo
export default Footer
