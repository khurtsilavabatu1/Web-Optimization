import { useState, useEffect } from "react";

const CHART_COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"];

function generateDetailedData(movies) {
  const byGenre = {};
  const byYear = {};
  const byDirector = {};

  for (const m of movies) {
    if (!byGenre[m.genre]) byGenre[m.genre] = { count: 0, totalRating: 0, totalRevenue: 0 };
    byGenre[m.genre].count++;
    byGenre[m.genre].totalRating += m.rating;
    byGenre[m.genre].totalRevenue += m.revenue;

    if (!byYear[m.year]) byYear[m.year] = { count: 0, totalRating: 0 };
    byYear[m.year].count++;
    byYear[m.year].totalRating += m.rating;

    if (!byDirector[m.director]) byDirector[m.director] = { count: 0, totalRating: 0 };
    byDirector[m.director].count++;
    byDirector[m.director].totalRating += m.rating;
  }

  return { byGenre, byYear, byDirector };
}

export default function MovieChart({ movies }) {
  const [view, setView] = useState("genre");
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(generateDetailedData(movies));
  }, [movies]);

  if (!data) return <div>Loading chart...</div>;

  let chartData;
  let title;

  if (view === "genre") {
    chartData = Object.entries(data.byGenre).map(([name, d]) => ({
      name,
      value: Math.round((d.totalRating / d.count) * 100) / 100,
      count: d.count,
    }));
    title = "Average Rating by Genre";
  } else if (view === "year") {
    chartData = Object.entries(data.byYear)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([name, d]) => ({
        name,
        value: Math.round((d.totalRating / d.count) * 100) / 100,
        count: d.count,
      }));
    title = "Average Rating by Year";
  } else {
    chartData = Object.entries(data.byDirector).map(([name, d]) => ({
      name: name.split(" ").pop(),
      value: Math.round((d.totalRating / d.count) * 100) / 100,
      count: d.count,
    }));
    title = "Average Rating by Director";
  }

  const maxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div style={{
      border: "1px solid #334155", borderRadius: 8, padding: 20,
      marginBottom: 20, background: "#1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {["genre", "year", "director"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "4px 12px", borderRadius: 4, border: "1px solid #475569",
                background: view === v ? "#4F46E5" : "transparent",
                color: view === v ? "#fff" : "#94a3b8",
                cursor: "pointer", fontSize: 12, textTransform: "capitalize",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "end", height: 200 }}>
        {chartData.map((d, i) => (
          <div key={d.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>{d.value}</span>
            <div style={{
              width: "100%", maxWidth: 40,
              height: `${(d.value / maxVal) * 160}px`,
              background: CHART_COLORS[i % CHART_COLORS.length],
              borderRadius: "4px 4px 0 0",
              transition: "height 0.3s",
            }} />
            <span style={{ fontSize: 10, color: "#64748b", textAlign: "center", lineHeight: 1.2 }}>
              {d.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, maxHeight: 150, overflowY: "auto", fontSize: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #334155" }}>
              <th style={{ textAlign: "left", padding: 4, color: "#64748b" }}>Category</th>
              <th style={{ textAlign: "left", padding: 4, color: "#64748b" }}>Avg Rating</th>
              <th style={{ textAlign: "left", padding: 4, color: "#64748b" }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((d) => (
              <tr key={d.name} style={{ borderBottom: "1px solid #1e293b" }}>
                <td style={{ padding: 4 }}>{d.name}</td>
                <td style={{ padding: 4, color: "#f59e0b" }}>{d.value}</td>
                <td style={{ padding: 4, color: "#64748b" }}>{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
