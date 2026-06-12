import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const navigationLinks = [
  { to: "/", label: "Mohe", current: true },
  { to: "/blog", label: "Glob", current: false },
  { to: "/about", label: "Batou", current: false },
];

const socialLinks = [
  { href: "https://mu.social/profile/dyslexic-goegrapher.be", label: "Mu" },
  { href: "https://blog.dyslexic-goegrapher.be", label: "Leaflet" },
  { href: "https://www.linkedin.com/in/arnomoerdijk", label: "LinkedIn" },
];

export default function Navigation() {
  return (
    <header className="border-b-gray-600">
      <div className="flex flex-col sm:flex-row items-center gap-8 min-h-16 p-1.5 w-full">
        <Link
          to="/"
          className="p-2.5 items-center inline-flex gap-3 text-inherit font-bold whitespace-nowrap"
          aria-label="Dyslexic Goegrapher home"
        >
          <img
            src="/logos/dyssi.svg"
            alt="dyslexic goegrapher logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span>Dyslexic Goegrapher</span>
        </Link>

        <div className="flex items-center gap-6 flex-1 w-full">
          <nav className="flex items-center gap-6" aria-label="Primary">
            {navigationLinks.map((link) => (
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  classNames(
                    "rounded-3xl p-2.5 text-inherit hover:bg-gray-200 dark:hover:text-gray-500",
                    isActive ? "font-semibold" : "",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div
            className="flex flex-col sm:flex-row items-center gap-2 ml-auto"
            aria-label="Social links"
          >
            {socialLinks.map((link) => (
              <a
                href={link.href}
                className="inline-flex items-center justify-center w-9 h-9 rounded-2xl text-inherit hover:bg-gray-200"
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
      </div>
    </header>
  );
}
