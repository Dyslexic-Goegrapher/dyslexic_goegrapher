export default function Projects() {
  return (
    <>
      <main className="rounded-2xl mb-1 p-2.5 ">
        <ul>
          <li className="hover:bg-gray-100">
            <a
              className="inline-flex items-center gap-2"
              href="https://codeberg.org/dyslexic-goegrapher"
            >
              <img
                className="h-4 w-4"
                src="https://codeberg.org/assets/img/favicon.png"
                alt=""
                aria-hidden="true"
              />
              <span>https://codeberg.org/dyslexic-goegrapher</span>
            </a>
          </li>
          <li className="hover:bg-gray-100">
            <a
              className="inline-flex items-center gap-2"
              href="https://github.com/Dyslexic-Goegrapher"
            >
              <img
                className="h-4 w-4"
                src="https://github.com/favicon.ico"
                alt=""
                aria-hidden="true"
              />
              <span>https://github.com/Dyslexic-Goegrapher</span>
            </a>
          </li>
          <li className="hover:bg-gray-100">
            <a
              className="inline-flex items-center gap-2"
              href="https://tangled.org/dyslexic-goegrapher.be"
            >
              <img
                className="h-4 w-4"
                src="https://tangled.org/static/logos/dolly.ico"
                alt=""
                aria-hidden="true"
              />
              <span>https://tangled.org/dyslexic-goegrapher.be</span>
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
