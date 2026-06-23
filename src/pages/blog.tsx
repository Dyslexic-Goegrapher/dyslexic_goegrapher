import PostList from "../components/blog/PostList";

export default function Blog() {
  return (
    <>
      <main className="rounded-2xl mb-1 p-2.5 hover:bg-gray-100">
        <a href="https://blog.dyslexic-goegrapher.be">
          blog.dyslexic-goegrapher.be {" ›"}
        </a>
      </main>
      <PostList />
    </>
  );
}
