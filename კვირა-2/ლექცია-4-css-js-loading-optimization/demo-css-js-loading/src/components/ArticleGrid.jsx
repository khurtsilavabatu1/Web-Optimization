import ArticleCard from './ArticleCard'
import './ArticleGrid.css'

const articles = [
  {
    id: 1,
    icon: '🚀',
    category: 'ტექნოლოგია',
    title: 'AI-ს ახალი ეპოქა: GPT-5 ოფიციალურად გამოვიდა',
    excerpt: 'ხელოვნური ინტელექტის ახალი თაობა ცვლის ინდუსტრიის სტანდარტებს უპრეცედენტო შესაძლებლობებით.',
    color: 'blue'
  },
  {
    id: 2,
    icon: '💻',
    category: 'პროგრამირება',
    title: 'React 19 ოფიციალურად გამოვიდა',
    excerpt: 'ახალი ვერსია მოიცავს React Compiler-ს და Server Components-ს production-ready სტატუსით.',
    color: 'purple'
  },
  {
    id: 3,
    icon: '🌐',
    category: 'ინტერნეტი',
    title: 'Web Performance: Core Web Vitals 2024',
    excerpt: 'Google-მა განაახლა მეტრიკები, რაც გავლენას მოახდენს SEO რეიტინგზე.',
    color: 'green'
  },
  {
    id: 4,
    icon: '📱',
    category: 'მობილური',
    title: 'iOS 18-ის ახალი ფუნქციები დეველოპერებისთვის',
    excerpt: 'Apple-მა წარმოადგინა ახალი API-ები და ინსტრუმენტები აპლიკაციების შესაქმნელად.',
    color: 'orange'
  },
  {
    id: 5,
    icon: '🔒',
    category: 'უსაფრთხოება',
    title: 'Cybersecurity 2024: ახალი საფრთხეები',
    excerpt: 'კიბერუსაფრთხოების ექსპერტები აფრთხილებენ AI-ით გამძლავრებული ჰაკერული თავდასხმების შესახებ.',
    color: 'red'
  },
  {
    id: 6,
    icon: '☁️',
    category: 'Cloud',
    title: 'Serverless არქიტექტურა: Best Practices',
    excerpt: 'როგორ ავაშენოთ მასშტაბირებადი აპლიკაციები AWS Lambda და Cloudflare Workers-ით.',
    color: 'teal'
  }
];

function ArticleGrid() {
  console.log('[ArticleGrid] Component rendered at:', performance.now().toFixed(1), 'ms');

  return (
    <section className="article-section" id="news">
      <h2 className="section-title">უახლესი სიახლეები</h2>
      <div className="article-grid">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} delay={index * 0.1} />
        ))}
      </div>
    </section>
  )
}

export default ArticleGrid
