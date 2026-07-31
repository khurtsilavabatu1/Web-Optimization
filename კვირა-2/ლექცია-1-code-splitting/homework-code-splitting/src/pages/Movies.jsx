import { useState } from "react";
import { getAllMovies, getMoviesByGenre, searchMovies, getGenres } from "../utils/movieData";
import MovieChart from "../components/MovieChart";

export default function Movies() {
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [showChart, setShowChart] = useState(false);

  let movies;
  if (search.length >= 2) {
    movies = searchMovies(search);
  } else if (genre === "All") {
    movies = getAllMovies();
  } else {
    movies = getMoviesByGenre(genre);
  }

  const sorted = [...movies].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "year") return b.year - a.year;
    if (sortBy === "revenue") return b.revenue - a.revenue;
    return a.title.localeCompare(b.title);
  });

  return (
    <div>
      <h1>Movies</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search movies, directors, actors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px", background: "#1e293b", border: "1px solid #475569",
            borderRadius: 6, color: "#e2e8f0", fontSize: 14, width: 260,
          }}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "8px 14px", background: "#1e293b", border: "1px solid #475569",
            borderRadius: 6, color: "#e2e8f0", fontSize: 14,
          }}
        >
          <option value="All">All Genres</option>
          {getGenres().map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px 14px", background: "#1e293b", border: "1px solid #475569",
            borderRadius: 6, color: "#e2e8f0", fontSize: 14,
          }}
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
          <option value="year">Sort by Year</option>
          <option value="revenue">Sort by Revenue</option>
        </select>
        <button
          onClick={() => setShowChart((v) => !v)}
          style={{
            padding: "8px 16px", background: "#4F46E5", color: "#fff",
            border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14,
          }}
        >
          {showChart ? "Hide Chart" : "Show Rating Chart"}
        </button>
        <span style={{ color: "#64748b", fontSize: 14 }}>{sorted.length} movies</span>
      </div>

      {showChart && <MovieChart movies={sorted.slice(0, 50)} />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {sorted.slice(0, 60).map((movie) => (
          <div key={movie.id} style={{
            borderRadius: 8, overflow: "hidden",
            background: "#1e293b", border: "1px solid #334155",
          }}>
            <div style={{ height: 120, background: movie.posterColor, display: "flex", alignItems: "end", padding: 12 }}>
              <span style={{ background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 4, fontSize: 13 }}>
                {movie.year} | {movie.runtime}min
              </span>
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 16, marginBottom: 4 }}>{movie.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>{movie.director}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  background: "#312e81", color: "#a5b4fc", padding: "2px 8px",
                  borderRadius: 12, fontSize: 12,
                }}>
                  {movie.genre}
                </span>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                  {"★"} {movie.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
