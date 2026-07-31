import { NavLink } from "react-router-dom";
import "../App.css";

const linkStyle = ({ isActive }) => ({
  padding: "8px 16px",
  borderRadius: 6,
  background: isActive ? "#4F46E5" : "transparent",
  color: isActive ? "#fff" : "#94a3b8",
  fontSize: 14,
  fontWeight: isActive ? 600 : 400,
  transition: "all 0.2s",
});

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 24px",
      background: "#1e293b",
      borderBottom: "1px solid #334155",
    }}>
      <span style={{ fontSize: 20, fontWeight: 700, color: "#f59e0b", marginRight: 16 }}>
        MovieHub
      </span>
      <NavLink to="/" style={linkStyle} end>Home</NavLink>
      <NavLink to="/movies" style={linkStyle}>Movies</NavLink>
      <NavLink to="/favorites" style={linkStyle}>Favorites</NavLink>
      <NavLink to="/stats" style={linkStyle}>Stats</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
    </nav>
  );
}
