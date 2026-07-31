export default function Home() {
  return (
    <div>
      <h1>Welcome to SplitDemo</h1>
      <p style={{ fontSize: 18, color: "#4b5563", maxWidth: 600 }}>
        This is a demo application for learning Code Splitting. Navigate to different pages
        to explore the app.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
        {[
          { title: "Dashboard", desc: "Analytics charts and data tables", icon: "📊" },
          { title: "Settings", desc: "Configure your preferences", icon: "⚙️" },
          { title: "About", desc: "Learn about this project", icon: "ℹ️" },
        ].map((card) => (
          <div key={card.title} style={{
            padding: 20, border: "1px solid #e5e7eb", borderRadius: 8,
            background: "#fff",
          }}>
            <div style={{ fontSize: 32 }}>{card.icon}</div>
            <h3 style={{ margin: "8px 0 4px" }}>{card.title}</h3>
            <p style={{ color: "#6b7280", margin: 0, fontSize: 14 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
