import { Link } from "remix";

export function ExampleDoc({
  id,
  title,
  path,
}: {
  id: string;
  title: string;
  path?: string;
}) {
  return (
    <Link
      to={`/j/${id}${path ? `?path=${path}` : ""}`}
      // bg-slate-900: 背景颜色为深石板色
      // px-4: 水平内边距为1rem
      // py-2: 垂直内边距为0.5rem
      // rounded-md: 中等圆角
      // whitespace-nowrap: 不换行
      // text-lime-300: 文字颜色为浅黄绿色
      // transition: 添加过渡效果
      // hover:text-lime-500: 鼠标悬停时文字颜色变为中等黄绿色
      className="bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
    >
      {title}
    </Link>
  );
}
