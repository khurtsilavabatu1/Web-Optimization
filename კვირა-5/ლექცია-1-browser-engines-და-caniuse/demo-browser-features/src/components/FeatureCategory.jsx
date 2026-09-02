import FeatureCard from './FeatureCard'

function FeatureCategory({ category }) {
  const supportedCount = category.features.filter(f => f.supported).length
  const totalCount = category.features.length

  return (
    <section className="feature-category">
      <div className="category-header">
        <h3>
          <span style={{ marginRight: '0.5rem' }}>{category.icon}</span>
          {category.title}
        </h3>
        <div className="category-stats">
          <span className="support-count">{supportedCount}</span>
          <span>/ {totalCount} მხარდაჭერილი</span>
        </div>
      </div>
      <div className="feature-grid">
        {category.features.map(feature => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}

export default FeatureCategory
