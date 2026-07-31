import { useState } from "react";
import { generateMovieReport } from "../utils/movieData";
import MovieChart from "../components/MovieChart";
import { getAllMovies } from "../utils/movieData";

export default function Stats() {
  const [report, setReport] = useState(null);
  const allMovies = getAllMovies();

  return (
    <div>
      <h1>Statistics</h1>

      <MovieChart movies={allMovies} />

      <button
        onClick={() => setReport(generateMovieReport())}
        style={{
          padding: "10px 20px", background: "#059669", color: "#fff",
          border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14,
          marginBottom: 24,
        }}
      >
        Generate Full Report
      </button>

      {report && (
        <div style={{ background: "#1e293b", borderRadius: 8, padding: 20, border: "1px solid #334155" }}>
          <h3>Full Report</h3>
          <p style={{ color: "#64748b", fontSize: 13 }}>Generated: {report.generatedAt}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
            <div style={{ padding: 16, background: "#0f172a", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Total Movies</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#3b82f6" }}>{report.totalMovies}</div>
            </div>
            <div style={{ padding: 16, background: "#0f172a", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Genres</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#10b981" }}>{Object.keys(report.genreStats).length}</div>
            </div>
            <div style={{ padding: 16, background: "#0f172a", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Directors</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b" }}>{Object.keys(report.directorStats).length}</div>
            </div>
          </div>

          <h4>Top 10 Highest Rated</h4>
          <div style={{ fontSize: 13, marginBottom: 16 }}>
            {report.topRated.map((m, i) => (
              <div key={m.id} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 0", borderBottom: "1px solid #1e293b",
              }}>
                <span>{i + 1}. {m.title}</span>
                <span style={{ color: "#f59e0b" }}>{"★"} {m.rating}</span>
              </div>
            ))}
          </div>

          <h4>Top 10 Highest Grossing</h4>
          <div style={{ fontSize: 13 }}>
            {report.highestGrossing.map((m, i) => (
              <div key={m.id} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 0", borderBottom: "1px solid #1e293b",
              }}>
                <span>{i + 1}. {m.title}</span>
                <span style={{ color: "#10b981" }}>${(m.revenue / 1000000).toFixed(0)}M</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
