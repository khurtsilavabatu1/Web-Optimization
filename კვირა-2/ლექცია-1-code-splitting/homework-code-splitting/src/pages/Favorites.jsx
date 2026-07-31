import { useState } from "react";
import { getAllMovies } from "../utils/movieData";

export default function Favorites() {
  const allMovies = getAllMovies();
  const [favorites, setFavorites] = useState(() =>
    allMovies.filter((_, i) => i % 17 === 0).map((m) => m.id)
  );

  const favoriteMovies = allMovies.filter((m) => favorites.includes(m.id));

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fId) => fId !== id));
  };

  return (
    <div>
      <h1>My Favorites</h1>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>{favoriteMovies.length} movies saved</p>

      {favoriteMovies.length === 0 ? (
        <div style={{
          padding: 40, textAlign: "center", background: "#1e293b",
          borderRadius: 8, color: "#64748b",
        }}>
          No favorites yet. Go to Movies and add some!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {favoriteMovies.map((movie) => (
            <div key={movie.id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: 16, background: "#1e293b", borderRadius: 8,
              border: "1px solid #334155",
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 6,
                background: movie.posterColor, flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, marginBottom: 2 }}>{movie.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
                  {movie.director} | {movie.year} | {movie.genre}
                </p>
              </div>
              <span style={{ color: "#f59e0b", fontWeight: 600, marginRight: 12 }}>
                {"★"} {movie.rating}
              </span>
              <button
                onClick={() => removeFavorite(movie.id)}
                style={{
                  padding: "6px 12px", background: "#991b1b", color: "#fecaca",
                  border: "none", borderRadius: 4, cursor: "pointer", fontSize: 13,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
