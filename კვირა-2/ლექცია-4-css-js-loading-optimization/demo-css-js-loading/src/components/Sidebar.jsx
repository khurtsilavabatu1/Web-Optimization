import './Sidebar.css'

function Sidebar() {
  console.log('[Sidebar] Component rendered at:', performance.now().toFixed(1), 'ms');

  return (
    <aside className="sidebar">
      {/* Trending Topics */}
      <div className="sidebar-widget">
        <h3 className="widget-title">ტრენდული თემები</h3>
        <ul className="trending-list">
          <li>
            <span className="trending-number">#1</span>
            <span className="trending-topic">AI და Machine Learning</span>
          </li>
          <li>
            <span className="trending-number">#2</span>
            <span className="trending-topic">Web Performance</span>
          </li>
          <li>
            <span className="trending-number">#3</span>
            <span className="trending-topic">React 19</span>
          </li>
          <li>
            <span className="trending-number">#4</span>
            <span className="trending-topic">Cybersecurity</span>
          </li>
          <li>
            <span className="trending-number">#5</span>
            <span className="trending-topic">Cloud Computing</span>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="sidebar-widget newsletter">
        <h3 className="widget-title">გამოიწერე Newsletter</h3>
        <p className="newsletter-text">
          მიიღე უახლესი სიახლეები ყოველ კვირას
        </p>
        <input
          type="email"
          className="newsletter-input"
          placeholder="თქვენი ელ-ფოსტა"
        />
        <button className="newsletter-btn">გამოწერა</button>
      </div>

      {/* Quick Stats */}
      <div className="sidebar-widget stats">
        <h3 className="widget-title">სტატისტიკა</h3>
        <div className="stat-item">
          <div className="stat-value">1,234</div>
          <div className="stat-label">დღევანდელი ვიზიტორი</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">45</div>
          <div className="stat-label">ახალი სტატია</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">8,932</div>
          <div className="stat-label">ჯამური მკითხველი</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
