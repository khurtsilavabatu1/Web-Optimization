import ArticleCard from './ArticleCard'

function ArticleGrid() {
  const articles = [
    {
      id: 1,
      title: 'React 18-ის ახალი ფუნქციები',
      category: 'React',
      excerpt: 'გაეცანით React 18-ის მთავარ განახლებებს: Concurrent Rendering, Automatic Batching და Transitions API.',
      date: '15 აგვისტო, 2024',
      readTime: '5 წთ',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'CSS Grid vs Flexbox',
      category: 'CSS',
      excerpt: 'როდის გამოვიყენოთ CSS Grid და როდის Flexbox? დეტალური შედარება და პრაქტიკული მაგალითები.',
      date: '12 აგვისტო, 2024',
      readTime: '8 წთ',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Web Performance ოპტიმიზაცია',
      category: 'Performance',
      excerpt: 'როგორ გავაუმჯობესოთ ვებსაიტის სიჩქარე: Core Web Vitals, ლეიზი ლოადინგი და კოდის გაყოფა.',
      date: '10 აგვისტო, 2024',
      readTime: '12 წთ',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'TypeScript Best Practices',
      category: 'TypeScript',
      excerpt: 'საუკეთესო პრაქტიკები TypeScript-ის გამოყენებისას: ტიპები, ინტერფეისები და გენერიკები.',
      date: '8 აგვისტო, 2024',
      readTime: '10 წთ',
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      title: 'REST API vs GraphQL',
      category: 'Backend',
      excerpt: 'REST API-ისა და GraphQL-ის შედარება, უპირატესობები, ნაკლოვანებები და გამოყენების შემთხვევები.',
      date: '5 აგვისტო, 2024',
      readTime: '7 წთ',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      title: 'Git ბრენჩების მართვა',
      category: 'Git',
      excerpt: 'Git-ში ბრენჩების სწორი მართვის სტრატეგიები: Git Flow, GitHub Flow და Trunk Based Development.',
      date: '3 აგვისტო, 2024',
      readTime: '6 წთ',
      image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ]

  return (
    <section className="articles-section" id="articles">
      <h2 className="section-title">უახლესი სტატიები</h2>
      <div className="article-grid">
        {articles.map(article => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  )
}

export default ArticleGrid
