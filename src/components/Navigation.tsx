import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

const navigationLinks = [
  { to: "/", label: "Mohe" },
  { to: "/blog", label: "Glob" },
  { to: "/about", label: "Batou" },
];

const socialLinks = [
  { href: "https://bsky.app/profile/dyslexic-goegrapher.be", label: "Bluesky" },
  { href: "https://blog.dyslexic-goegrapher.be", label: "Leaflet" },
  { href: "https://www.linkedin.com/in/arnomoerdijk", label: "LinkedIn" },
];

export default function Navigation() {
  return (
    <header className="site-header">
      <div className="site-header__main">
        <Link
          to="/"
          className="site-header__brand"
          aria-label="Dyslexic Goegrapher home"
        >
          <img
            src="/logos/dyssi.svg"
            alt="dyslexic goegrapher logo"
            className="site-header__logo"
          />
          <span>Dyslexic Goegrapher</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navigationLinks.map((link) => (
            <NavLink to={link.to} className="site-header__link">
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__socials" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              className="site-header__social-link"
              aria-label={link.label}
              title={link.label}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`/logos/${link.label.toLowerCase().replace(/\s/g, "")}.svg`}
                alt={`${link.label} logo`}
              />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
