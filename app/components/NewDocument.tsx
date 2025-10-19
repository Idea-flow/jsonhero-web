import { DragAndDropForm } from "./DragAndDropForm";
import { Title } from "./Primitives/Title";
import { SampleUrls } from "./SampleUrls";
import { UrlForm } from "./UrlForm";
import { useTheme } from "./ThemeProvider";

export function NewDocument() {
  const [theme] = useTheme();

  return (
    <div className={`rounded-xl shadow-lg w-96 max-w-max p-6 transition border ${
      theme === "dark" 
        ? "bg-slate-800/90 backdrop-blur-sm text-gray-200 border-slate-700" 
        : "bg-white/90 backdrop-blur-sm text-gray-800 border-gray-200"
    }`}>
      <div className="flex flex-col">
        <UrlForm className="mb-4" />
        <DragAndDropForm />

        <div className="mt-6">
          <Title className={`mb-3 text-sm font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            没有 JSON 文件？试试这些示例：
          </Title>
          <SampleUrls />
        </div>
      </div>
    </div>
  );
}