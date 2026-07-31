import { useState } from "react";
import HeavyChart from "../components/HeavyChart";
import DataTable from "../components/DataTable";
import { getProductStats, generateReport } from "../utils/heavyUtils";

export default function Dashboard() {
  const [showChart, setShowChart] = useState(true);
  const [report, setReport] = useState(null);
  const stats = getProductStats();

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        {Object.entries(stats).slice(0, 5).map(([cat, data]) => (
          <div key={cat} style={{
            padding: 16, background: "#f9fafb", borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}>
            <div style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase" }}>{cat}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{data.count}</div>
            <div style={{ fontSize: 13, color: "#059669" }}>Avg ${data.avgPrice}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setShowChart((v) => !v)}
          style={{
            padding: "8px 16px", background: "#4F46E5", color: "#fff",
            border: "none", borderRadius: 6, cursor: "pointer", marginRight: 8,
          }}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
        <button
          onClick={() => setReport(generateReport())}
          style={{
            padding: "8px 16px", background: "#059669", color: "#fff",
            border: "none", borderRadius: 6, cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </div>

      {showChart && <HeavyChart />}

      {report && (
        <div style={{
          marginTop: 16, padding: 16, background: "#f0fdf4",
          borderRadius: 8, border: "1px solid #bbf7d0",
        }}>
          <h3 style={{ marginTop: 0 }}>Generated Report</h3>
          <p>Total Products: {report.totalProducts}</p>
          <p>Total Countries: {report.totalCountries}</p>
          <p>Generated: {report.generatedAt}</p>
        </div>
      )}

      <h2 style={{ marginTop: 32 }}>Product Catalog</h2>
      <DataTable />
    </div>
  );
}
