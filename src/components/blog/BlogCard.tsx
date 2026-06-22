<<<<<<< HEAD
import { Link } from "react-router-dom";

=======
>>>>>>> parent of 4127e92 (Adding documentation)
export default function BlogCard({
  title,
  summary,
  to,
}: {
  title: string;
  summary: string | undefined;
  to: string;
}) {
  return (
    <div className="relative isolate flex flex-col sm:flex-row gap-2 bg-gray-100 dark:text-gray-500 hover:shadow rounded-2xl p-2 items-center text-center">
      <Link to={to} className="text-2xl font-bold font-serif sm:w-1/3">
        <span className="absolute inset-0 z-10"></span>
        {title}
      </Link>
      {summary ? <p className="font-serif">{summary}</p> : null}
    </div>
  );
}
