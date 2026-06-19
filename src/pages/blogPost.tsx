import "./markdown.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  getDocument,
  getDocumentMarkdown,
  type RepoRecord,
} from "../components/blog/blogApi";
import { standard } from "../lexicons/site";

export default function BlogPostPage() {
  const { rkey } = useParams();
  const [document, setDocument] =
    useState<RepoRecord<standard.document.Main> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogPost() {
      if (!rkey) {
        setError("Missing blog post identifier.");
        return;
      }

      try {
        const record = await getDocument(rkey);
        setDocument(record);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load blog post",
        );
      }
    }

    void loadBlogPost();
  }, [rkey]);

  if (error) {
    return (
      <main className="p-3 max-w-3xl text-left">
        <p>{error}</p>
        <Link to="/blog">Back to blog overview</Link>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="p-3 max-w-3xl text-left">Loading blog post...</main>
    );
  }

  const markdown = getDocumentMarkdown(document.value);

  return (
    <main className="p-3 max-w-3xl text-left">
      <p className="text-gray-500 font-light text-xs pb-4">
        <Link to="/blog">← Back to blog overview</Link>
      </p>
      <article className="flex flex-col gap-4 text-center font-serif">
        <div>
          <header>
            <h1 className="font-bold">{document.value.title}</h1>
            {document.value.description ? (
              <p>{document.value.description}</p>
            ) : null}
          </header>
          <div className="markdown-content">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
}
