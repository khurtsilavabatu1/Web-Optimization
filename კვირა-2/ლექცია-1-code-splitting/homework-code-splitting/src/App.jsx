import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import Stats from "./pages/Stats";
import About from "./pages/About";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
