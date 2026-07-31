import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";

// Route-based code splitting — თითოეული გვერდი ცალკე chunk-ში
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const About = lazy(() => import("./pages/About"));

function LoadingFallback() {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: 200, color: "#6b7280", fontSize: 16,
    }}>
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
