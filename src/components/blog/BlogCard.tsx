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
    <div className="flex flex-row gap-2 hover:bg-gray-200 dark:hover:text-gray-500 rounded-2xl p-2">
      <a href={url} className="text-2xl font-bold font-serif">
        {title}
      </a>
      {summary ? <p className="font-serif text-center">{summary}</p> : null}
    </div>
  );
}
