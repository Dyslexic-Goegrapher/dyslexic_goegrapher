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
    <div className="items-center text-center rounded-2xl sm:flex-row">
      <div className="relative isolate flex flex-col items-center gap-2 rounded-2xl p-2 bg-gray-100 dark:text-gray-500 dark:shadow-gray-50 hover:shadow sm:flex-row">
        <a href={url} className="font-serif font-bold text-2xl sm:w-1/3">
          <span className="absolute inset-0 z-10"></span>
          {title}
        </a>
        <div className="max-w-sm">
          {summary ? <p className="font-serif">{summary}</p> : null}
        </div>
      </div>
    </div>
  );
}
