import { standard } from "../../lexicons/site";
import { markpub } from "../../lexicons/at";

const PDS_HOST = "https://eurosky.social";
const REPO_DID = "did:plc:rju7gfa2xhjzlscfg457retz";
const PUBLICATION_URI =
  "at://did:plc:rju7gfa2xhjzlscfg457retz/site.standard.publication/3mmyafx7poc2m";

type RepoRecord<T> = {
  uri: string;
  cid: string;
  value: T;
};

type ListRepoRecords<T> = {
  records: RepoRecord<T>[];
  cursor?: string;
};

function isMarkdownContent(content: unknown): content is markpub.markdown.Main {
  if (!content || typeof content !== "object") {
    return false;
  }

  const typedContent = content as {
    $type?: unknown;
    text?: { markdown?: unknown };
  };

  return (
    typedContent.$type === "at.markpub.markdown" &&
    (!typedContent.text || typeof typedContent.text.markdown === "string")
  );
}

/**
 * List of all the blog posts within my publication "Dyslexic Goegrapher".
 */
export async function listDocuments(): Promise<
  RepoRecord<standard.document.Main>[]
> {
  const url = new URL(`${PDS_HOST}/xrpc/com.atproto.repo.listRecords`);
  url.searchParams.set("repo", REPO_DID);
  url.searchParams.set("collection", "site.standard.document");
  url.searchParams.set("reverse", "false");

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to list documents: ${res.status} ${res.statusText}`,
    );
  }

  const data: ListRepoRecords<standard.document.Main> = await res.json();

  return data.records.filter((posts) => posts.value.site === PUBLICATION_URI);
}

/**
 * Fetch a single blog post by ATProto record key.
 */
export async function getDocument(
  rkey: string,
): Promise<RepoRecord<standard.document.Main>> {
  const url = new URL(`${PDS_HOST}/xrpc/com.atproto.repo.getRecord`);
  url.searchParams.set("repo", REPO_DID);
  url.searchParams.set("collection", "site.standard.document");
  url.searchParams.set("rkey", rkey);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to load document: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Returns markdown when the document content is stored as at.markpub markdown.
 */
export function getDocumentMarkdown(document: standard.document.Main): string {
  if (isMarkdownContent(document.content)) {
    return (
      document.content.text?.markdown ??
      "# Er ging iets fout bij het laden van de markdown"
    );
  }

  return (
    document.textContent ??
    "# Content werd niet opgeslagen in [at.markpub](https://markpub.at/) formaat."
  );
}

export type { RepoRecord, ListRepoRecords };
