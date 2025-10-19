import { Link } from "remix";
import { useTheme } from "~/components/ThemeProvider";

export function ExampleDoc({
  id,
  title,
  path,
}: {
  id: string;
  title: string;
  path?: string;
}) {
  const [theme] = useTheme();

  return (
    <Link
      to={`/j/${id}${path ? `?path=${path}` : ""}`}
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
        theme === "dark"
          ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 hover:text-purple-200 hover:from-purple-800/50 hover:to-indigo-800/50 border border-purple-900/50"
          : "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 hover:text-purple-800 hover:from-purple-200 hover:to-indigo-200 border border-purple-200"
      }`}
    >
      {title}
    </Link>
  );
}