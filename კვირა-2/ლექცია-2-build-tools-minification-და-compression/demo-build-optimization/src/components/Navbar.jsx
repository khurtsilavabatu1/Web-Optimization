import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/settings", label: "Settings" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      display: "flex", gap: 4, padding: "12px 20px",
      background: "#1f2937", marginBottom: 0,
    }}>
      <span style={{ color: "#fff", fontWeight: 700, marginRight: 20, fontSize: 16 }}>
        SplitDemo
      </span>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            padding: "6px 14px", borderRadius: 6, textDecoration: "none", fontSize: 14,
            color: location.pathname === item.path ? "#fff" : "#9ca3af",
            background: location.pathname === item.path ? "#4F46E5" : "transparent",
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
