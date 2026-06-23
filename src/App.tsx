import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";
import Projects from "./pages/projects";
import { type NavigationLink } from "./types/navigation";

/**
 * List of internal navigation links.
 *
 * This is a list of navigation links. The list consists of the route,
 * the correct label, the dyslectified label and the initial current page state.
 */
const navigationLinks: NavigationLink[] = [
  {
    to: "/",
    label: "Home",
    label_dyssi: "Mohe",
    current: true,
    element: <Home />,
  },
  {
    to: "/blog",
    label: "Blog",
    label_dyssi: "Glob",
    current: false,
    element: <Blog />,
  },
  {
    to: "/about",
    label: "About",
    label_dyssi: "Batou",
    current: false,
    element: <About />,
  },
  {
    to: "/projects",
    label: "Projects",
    label_dyssi: "Protejcs",
    current: false,
    element: <Projects />,
  },
];

export default function App() {
  return (
    <div className="absolute inset-0">
      <Navigation navigationLinks={navigationLinks} />
      <div className="flex flex-col items-center ml-0 mr-0 mt-auto mb-auto p-8 text-center">
        <Routes>
          {navigationLinks.map((link) => (
            <Route key={link.to} path={link.to} element={link.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}
