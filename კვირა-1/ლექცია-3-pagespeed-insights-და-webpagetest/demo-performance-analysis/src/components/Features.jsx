/*
  ==========================================
  Features Component — არაოპტიმიზირებული
  ==========================================

  პრობლემები:
  1. No React.memo — re-renders unnecessarily
  2. Inline styles on every render
  3. Heavy DOM nesting
*/

function Features() {
  const features = [
    {
      icon: 'fa-shipping-fast',
      title: 'სწრაფი მიწოდება',
      desc: 'თბილისში — 1 საათში, რეგიონებში — 24 საათში'
    },
    {
      icon: 'fa-shield-alt',
      title: 'ოფიციალური გარანტია',
      desc: 'ყველა პროდუქტზე 2 წლიანი საერთაშორისო გარანტია'
    },
    {
      icon: 'fa-credit-card',
      title: 'განვადება',
      desc: '0% განვადება 12 თვემდე ნებისმიერ ბანკში'
    },
    {
      icon: 'fa-headset',
      title: '24/7 მხარდაჭერა',
      desc: 'გვირგვინური მომსახურება ყოველდღე, მთელი დღე'
    }
  ]

  return (
    <div className="features-section">
      <h2 className="section-title">
        <i className="fas fa-star"></i> რატომ ჩვენ?
      </h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          // PROBLEM: Unnecessary wrapper divs
          <div className="feature-wrapper" key={index}>
            <div className="feature-inner">
              <div className="feature-box">
                <div className="feature-content">
                  <div className="feature-icon-wrapper">
                    <i className={`fas ${feature.icon} fa-3x`}></i>
                  </div>
                  <div className="feature-text-wrapper">
                    <div className="feature-title-wrapper">
                      <h3>{feature.title}</h3>
                    </div>
                    <div className="feature-desc-wrapper">
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// PROBLEM: არ არის React.memo
export default Features
