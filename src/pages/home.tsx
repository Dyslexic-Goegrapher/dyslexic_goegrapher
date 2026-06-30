export default function Home() {
  return (
    <main>
      <h1 className="font-bold">What is this?</h1>
      <p className="text-gray-500 dark:text-white">This site is a place to:</p>
      <ol className="text-gray-500 dark:text-white space-y-1">
        <li className="text-xs list-none before:content-['🔨'] before:mr-2">
          Show what I build
        </li>
        <li className="text-xs list-none before:content-['📝'] before:mr-2">
          Publish blog posts
        </li>
        <li className="text-xs list-none before:content-['🧪'] before:mr-2">
          Experiment with new ideas
        </li>
      </ol>
    </main>
  );
}
