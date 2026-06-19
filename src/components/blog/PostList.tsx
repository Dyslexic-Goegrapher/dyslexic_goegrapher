import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { listDocuments } from "./blogApi";

type BlogPost = Awaited<ReturnType<typeof listDocuments>>[number];

/**
 * Fetch the blogposts from the PDS and generate a component based on the data.
 */
export default function PostList() {
  const [documents, setDocuments] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogposts() {
      try {
        const records = await listDocuments();
        setDocuments(records);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load blog posts",
        );
      }
    }

    void loadBlogposts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {documents.map((document) => (
        <BlogCard
          key={document.uri}
          title={document.value.title}
          summary={document.value.description}
          to={`/blog/${document.uri.split("/").pop()}`}
        />
      ))}
    </div>
  );
}
