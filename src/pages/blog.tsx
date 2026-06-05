import * as publication from "../../lexicons/site/standard/publication.json";

export default function Blog() {
  return (
    <main>
      <header>
        <h1>Blog</h1>
        <p>
          If the blog does not load below, you can open it directly at{" "}
          <a href="https://blog.dyslexic-goegrapher.be">
            blog.dyslexic-goegrapher.be
          </a>
          .
        </p>
      </header>
      <iframe
        title="Dyslexic Goegrapher blog"
        src="https://blog.dyslexic-goegrapher.be"
        style={{ border: 0, height: "80vh", width: "100%" }}
      />
    </main>
  );
}
