import PostList from "../components/blog/PostList";

export default function Blog() {
  return (
    <>
      <main className="p-3">
        <h1>Blog</h1>
        <p>
          <a href="https://blog.dyslexic-goegrapher.be">
            blog.dyslexic-goegrapher.be
          </a>
          .
        </p>
      </main>
      <PostList />
    </>
  );
}
