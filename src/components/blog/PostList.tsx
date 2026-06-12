import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { standard } from "../../lexicons/site";

type DocumentRecord = {
  uri: string;
  value: standard.document.Main;
};

async function listDocuments(repo: string): Promise<DocumentRecord[]> {
  const pdsHost = "https://eurosky.social";

  const url = new URL(`${pdsHost}/xrpc/com.atproto.repo.listRecords`);
  url.searchParams.set("repo", repo);
  url.searchParams.set("collection", "site.standard.document");
  url.searchParams.set("limit", "99");
  url.searchParams.set("reverse", "false");

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to list documents: ${res.status} ${res.statusText}`,
    );
  }
  const blogPosts: DocumentRecord[] = [];
  const data: { records: DocumentRecord[] } = await res.json();
  for (const post of data.records) {
    console.log(post.value.site);
    if (post.value.site.includes("publication")) {
      blogPosts.push(post);
    }
  }
  return blogPosts;
}

export default function PostList({ repo }: { repo: string }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const records = await listDocuments(repo);
        setDocuments(records);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load blog posts",
        );
      }
    }

    void loadDocuments();
  }, [repo]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex gap-3">
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
