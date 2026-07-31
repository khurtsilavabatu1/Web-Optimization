export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: 32, color: "#f59e0b", marginBottom: 8 }}>Welcome to MovieHub</h1>
      <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, marginBottom: 32 }}>
        Browse movies, save favorites, and explore statistics. This app is your Code Splitting homework!
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { title: "Movies", desc: "Browse 300+ movies with filters", color: "#3b82f6" },
          { title: "Favorites", desc: "Your saved movie list", color: "#ef4444" },
          { title: "Stats", desc: "Charts and analytics", color: "#10b981" },
          { title: "About", desc: "About this project", color: "#8b5cf6" },
        ].map((card) => (
          <div key={card.title} style={{
            padding: 20, borderRadius: 8, background: "#1e293b",
            border: "1px solid #334155",
          }}>
            <div style={{ width: 40, height: 4, background: card.color, borderRadius: 2, marginBottom: 12 }} />
            <h3 style={{ marginBottom: 4 }}>{card.title}</h3>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
