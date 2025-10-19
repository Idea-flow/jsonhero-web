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
      className={`px-4 py-2 rounded-md whitespace-nowrap transition ${
        theme === "dark"
          ? "bg-slate-700 text-lime-300 hover:text-lime-500"
          : "bg-slate-200 text-lime-700 hover:text-lime-800"
      }`}
    >
      {title}
    </Link>
  );
}