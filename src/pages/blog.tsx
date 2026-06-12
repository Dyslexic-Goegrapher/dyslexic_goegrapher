import PostList from "../components/blog/PostList";

export default function Blog() {
  return (
    <main>
      <header className="mb-8">
        <h1>Blog</h1>
        <p>
          If the blog does not load below, you can open it directly at{" "}
          <a href="https://blog.dyslexic-goegrapher.be">
            blog.dyslexic-goegrapher.be
          </a>
          .
        </p>
      </header>
      <PostList repo="did:plc:rju7gfa2xhjzlscfg457retz" />
    </main>
  );
}
