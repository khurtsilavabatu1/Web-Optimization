function ArticleCard({ title, category, excerpt, date, readTime, image }) {
  return (
    <article className="article-card">
      <div className="article-image" style={{ background: image }}>
        <span className="article-category">{category}</span>
      </div>
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <p className="article-excerpt">{excerpt}</p>
        <div className="article-meta">
          <span className="article-date">{date}</span>
          <span className="article-read-time">{readTime}</span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
