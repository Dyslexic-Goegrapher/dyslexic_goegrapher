import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

/**
 * Combines conditional class names into a single class string.
 */
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * List of internal navigation links.
 *
 * This is a list of navigation links. The list consists of the route,
 * the correct label, the dyslectified label and the initial current page state.
 */
const navigationLinks = [
  { to: "/", label: "Home", label_dyssi: "Mohe", current: true },
  { to: "/blog", label: "Blog", label_dyssi: "Glob", current: false },
  { to: "/about", label: "About", label_dyssi: "Batou", current: false },
];

/**
 * List of links to the socials.
 */
const socialLinks = [
  { href: "https://mu.social/profile/dyslexic-goegrapher.be", label: "Mu" },
  { href: "https://blog.dyslexic-goegrapher.be", label: "Leaflet" },
  { href: "https://www.linkedin.com/in/arnomoerdijk", label: "LinkedIn" },
];

export default function Navigation() {
  return (
    <header className="border-b border-b-gray-600 dark:border-gray-100">
      <div className="flex flex-row p-2.5">
        <Link
          to="/"
          className="flex flex-1 items-center gap-3 p-2.5 text-center font-bold"
          aria-label="Dyslexic Goegrapher home"
        >
          <img
            src="/logos/dyssi.svg"
            alt="dyslexic goegrapher logo"
            className="h-8"
          />
          <span>Dyslexic Goegrapher</span>
        </Link>
        <div className="flex flex-col items-center sm:flex-row">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              className="inline-flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-gray-200"
              aria-label={link.label}
              title={link.label}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-5 h-5"
                src={`/logos/${link.label.toLowerCase().replace(/\s/g, "")}.svg`}
                alt={`${link.label} logo`}
              />
            </a>
          ))}
        </div>
      </div>
      <nav className="flex justify-center gap-6 w-full" aria-label="Primary">
        {navigationLinks.map((link) => (
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              classNames(
                "group inline-grid rounded-3xl p-2.5 text-inherit hover:bg-gray-200 dark:hover:text-gray-500",
                isActive ? "font-semibold" : "",
              )
            }
          >
            {({ isActive }) =>
              isActive ? (
                <span className="col-start-1 row-start-1 opacity-100">
                  {link.label}
                </span>
              ) : (
                <>
                  <span className="col-start-1 row-start-1 opacity-100">
                    {link.label_dyssi.split("").map((char, index) => (
                      <span
                        key={`${link.to}-${index}`}
                        className={
                          index % 2 === 0
                            ? "inline-block group-hover:animate-dyslexic-0"
                            : "inline-block group-hover:animate-dyslexic-1"
                        }
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-0 group-hover:opacity-100">
                    {link.label}
                  </span>
                </>
              )
            }
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
