function Sidebar() {
  const categories = [
    { name: 'React', count: 12 },
    { name: 'CSS', count: 8 },
    { name: 'JavaScript', count: 15 },
    { name: 'Performance', count: 6 },
    { name: 'TypeScript', count: 9 },
    { name: 'Backend', count: 7 }
  ]

  const popularPosts = [
    { id: 1, title: 'React Hooks გაიდი დამწყებთათვის', views: '2.5k' },
    { id: 2, title: 'CSS Animation-ის საფუძვლები', views: '1.8k' },
    { id: 3, title: 'JavaScript-ის Async/Await', views: '3.2k' },
    { id: 4, title: 'Vite vs Webpack შედარება', views: '1.5k' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-widget">
        <h3 className="widget-title">კატეგორიები</h3>
        <ul className="category-list">
          {categories.map((cat, index) => (
            <li key={index} className="category-item">
              <a href={`#${cat.name.toLowerCase()}`}>
                {cat.name}
                <span className="category-count">{cat.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-widget">
        <h3 className="widget-title">პოპულარული სტატიები</h3>
        <ul className="popular-posts">
          {popularPosts.map(post => (
            <li key={post.id} className="popular-post">
              <a href={`#post-${post.id}`}>
                {post.title}
                <span className="post-views">{post.views} ნახვა</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
