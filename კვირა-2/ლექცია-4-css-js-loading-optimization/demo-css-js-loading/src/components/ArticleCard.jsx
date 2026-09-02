import './ArticleCard.css'

function ArticleCard({ article, delay = 0 }) {
  return (
    <article
      className={`article-card ${article.color}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="article-icon">{article.icon}</div>
      <div className="article-content">
        <span className="article-category">{article.category}</span>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <a href="#" className="article-link">
          წაიკითხე მეტი →
        </a>
      </div>
    </article>
  )
}

export default ArticleCard
