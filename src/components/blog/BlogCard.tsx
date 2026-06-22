/**
 * Component that renders a blog card based on provided props.
 */
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
    <div className="flex flex-col sm:flex-row gap-2 hover:bg-gray-200 dark:hover:text-gray-500 rounded-2xl p-2 border-gray-800 dark:border-gray-50 border items-center text-center">
      <a href={url} className="text-2xl font-bold font-serif sm:w-1/3">
        {title}
      </a>
      {summary ? <p className="font-serif">{summary}</p> : null}
    </div>
  );
}
