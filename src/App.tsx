import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";

export default function App() {
  return (
    <div className="absolute inset-0">
      <Navigation />
      <div className="flex flex-col items-center ml-0 mr-0 mt-auto mb-auto p-8 text-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
}
