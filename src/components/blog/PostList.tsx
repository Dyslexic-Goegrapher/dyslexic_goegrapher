import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { standard } from "../../lexicons/site";

/**
 * Type definition for a blogpost written on my atproto PDS.
 */
type BlogPost = {
  uri: string;
  value: standard.document.Main;
};

/**
 * List of all the blog posts within my publication "Dyslexic Goegrapher".
 *
 * The function fetches all documents from my atproto PDS and filters the blog posts on my
 * publication 'Dyslexic Goegrapher'.
 * @returns A promise that resolves to an array of `BlogPost` objects.
 */
async function listDocuments(publication: string): Promise<BlogPost[]> {
  const pdsHost = "https://eurosky.social";

  const url = new URL(`${pdsHost}/xrpc/com.atproto.repo.listRecords`);
  url.searchParams.set("repo", "did:plc:rju7gfa2xhjzlscfg457retz");
  url.searchParams.set("collection", "site.standard.document");
  url.searchParams.set("limit", "99");
  url.searchParams.set("reverse", "false");

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to list documents: ${res.status} ${res.statusText}`,
    );
  }
  const blogPosts: BlogPost[] = [];
  const data: { records: BlogPost[] } = await res.json();
  for (const post of data.records) {
    if (post.value.site === publication) {
      blogPosts.push(post);
    }
  }
  return blogPosts;
}

/**
 * Fetch the blogposts from the PDS an generate a component based on the data.
 */
export default function PostList({ publication }: { publication: string }) {
  const [documents, setDocuments] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogposts() {
      try {
        const records = await listDocuments(publication);
        setDocuments(records);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load blog posts",
        );
      }
    }

    void loadBlogposts();
  }, [publication]);

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
          url={`https://blog.dyslexic-goegrapher.be/${document.value.path}`}
        />
      ))}
    </div>
  );
}
