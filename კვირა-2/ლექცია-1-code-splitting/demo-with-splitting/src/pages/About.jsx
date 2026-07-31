import { getAllCountries } from "../utils/heavyUtils";

export default function About() {
  const countries = getAllCountries();

  return (
    <div>
      <h1>About SplitDemo</h1>
      <p style={{ fontSize: 16, color: "#4b5563", maxWidth: 600 }}>
        This application demonstrates code splitting techniques in React.
        It intentionally includes heavy components and data to make the
        difference between split and non-split bundles visible.
      </p>

      <h2>Fun Facts — Countries in our database</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 12, marginTop: 16,
      }}>
        {countries.map((country) => (
          <div key={country.code} style={{
            padding: 14, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff",
          }}>
            <div style={{ fontWeight: 600 }}>{country.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Capital: {country.capital}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Population: {(country.population / 1_000_000).toFixed(1)}M
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
