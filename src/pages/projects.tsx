export default function Projects() {
  return (
    <>
      <ul className="flex flex-col gap-5">
        <li>
          <a
            className="inline-flex items-center gap-2 rounded bg-gray-200 p-2.5 hover:bg-gray-300"
            href="https://codeberg.org/dyslexic-goegrapher/dyslexic_goegrapher"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 9h16M4 15h16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Personal website</span>
          </a>
        </li>
        <li>
          <a
            className="inline-flex items-center gap-2 rounded bg-gray-200 p-2.5 hover:bg-gray-300"
            href="https://codeberg.org/dyslexic-goegrapher/keep_it"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="-10.5 -9.45 21 18.9"
            >
              <circle cx="0" cy="0" fill="currentColor" r="2" />
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <ellipse rx="10" ry="4.5" />
                <ellipse rx="10" ry="4.5" transform="rotate(60)" />
                <ellipse rx="10" ry="4.5" transform="rotate(120)" />
              </g>
            </svg>
            <span>React Native app</span>
          </a>
        </li>
      </ul>
    </>
  );
}
