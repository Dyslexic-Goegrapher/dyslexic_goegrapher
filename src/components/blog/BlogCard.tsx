export default function BlogCard({
  title,
  summary,
  url,
}: {
  title: string;
  summary: string | undefined;
  url: string;
}) {
  return (
    <a href={url}>
      <h1>{title}</h1>
      {summary ? <p>{summary}</p> : null}
    </a>
  );
}
