import { useState, useEffect } from "react";

function generateChartData(points) {
  const data = [];
  let value = 50;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.48) * 10;
    value = Math.max(0, Math.min(100, value));
    data.push({
      x: i,
      y: Math.round(value * 100) / 100,
      label: `Point ${i + 1}`,
      timestamp: new Date(2024, 0, 1 + Math.floor(i / 24), i % 24).toISOString(),
    });
  }
  return data;
}

const CHART_COLORS = [
  "#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981",
  "#3B82F6", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16",
];

const CHART_DATASETS = [
  { name: "Revenue", points: 200 },
  { name: "Users", points: 200 },
  { name: "Page Views", points: 200 },
  { name: "Conversions", points: 200 },
  { name: "Bounce Rate", points: 200 },
];

export default function HeavyChart() {
  const [datasets, setDatasets] = useState([]);
  const [activeDataset, setActiveDataset] = useState(0);

  useEffect(() => {
    const generated = CHART_DATASETS.map((ds) => ({
      ...ds,
      data: generateChartData(ds.points),
    }));
    setDatasets(generated);
  }, []);

  if (datasets.length === 0) return <div>Loading chart data...</div>;

  const currentData = datasets[activeDataset].data;
  const maxY = Math.max(...currentData.map((d) => d.y));
  const minY = Math.min(...currentData.map((d) => d.y));

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Analytics Chart</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {datasets.map((ds, i) => (
          <button
            key={ds.name}
            onClick={() => setActiveDataset(i)}
            style={{
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid #d1d5db",
              background: i === activeDataset ? CHART_COLORS[i] : "#fff",
              color: i === activeDataset ? "#fff" : "#374151",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {ds.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ background: "#f3f4f6", padding: "8px 16px", borderRadius: 6 }}>
          <small style={{ color: "#6b7280" }}>Min</small>
          <div style={{ fontWeight: 600 }}>{minY.toFixed(2)}</div>
        </div>
        <div style={{ background: "#f3f4f6", padding: "8px 16px", borderRadius: 6 }}>
          <small style={{ color: "#6b7280" }}>Max</small>
          <div style={{ fontWeight: 600 }}>{maxY.toFixed(2)}</div>
        </div>
        <div style={{ background: "#f3f4f6", padding: "8px 16px", borderRadius: 6 }}>
          <small style={{ color: "#6b7280" }}>Points</small>
          <div style={{ fontWeight: 600 }}>{currentData.length}</div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 250,
          background: "#fafafa",
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${currentData.length} 100`} preserveAspectRatio="none">
          <polyline
            points={currentData.map((d) => `${d.x},${100 - ((d.y - minY) / (maxY - minY)) * 100}`).join(" ")}
            fill="none"
            stroke={CHART_COLORS[activeDataset]}
            strokeWidth="0.5"
          />
          <polygon
            points={`0,100 ${currentData.map((d) => `${d.x},${100 - ((d.y - minY) / (maxY - minY)) * 100}`).join(" ")} ${currentData.length - 1},100`}
            fill={CHART_COLORS[activeDataset]}
            fillOpacity="0.1"
          />
        </svg>
      </div>

      <div style={{ marginTop: 16, maxHeight: 200, overflowY: "auto", fontSize: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: 4 }}>#</th>
              <th style={{ textAlign: "left", padding: 4 }}>Value</th>
              <th style={{ textAlign: "left", padding: 4 }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentData.slice(0, 50).map((d) => (
              <tr key={d.x} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: 4 }}>{d.x + 1}</td>
                <td style={{ padding: 4 }}>{d.y.toFixed(2)}</td>
                <td style={{ padding: 4, color: "#6b7280" }}>{d.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
