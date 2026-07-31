export default function About() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>About MovieHub</h1>
      <p style={{ color: "#94a3b8", marginBottom: 16 }}>
        MovieHub is a demo application built for the Web Optimization course.
        It demonstrates a multi-page React application that needs Code Splitting optimization.
      </p>

      <div style={{
        padding: 20, background: "#1e293b", borderRadius: 8,
        border: "1px solid #334155", marginBottom: 16,
      }}>
        <h3 style={{ color: "#f59e0b", marginBottom: 8 }}>Your Task</h3>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>
          This app loads all pages and components at once, even when the user only visits the Home page.
          Apply Code Splitting techniques to optimize the loading performance.
        </p>
      </div>

      <div style={{
        padding: 20, background: "#1e293b", borderRadius: 8,
        border: "1px solid #334155",
      }}>
        <h3 style={{ marginBottom: 8 }}>Tech Stack</h3>
        <ul style={{ color: "#94a3b8", fontSize: 14, paddingLeft: 20 }}>
          <li>React 18</li>
          <li>React Router 6</li>
          <li>Vite</li>
        </ul>
      </div>
    </div>
  );
}
