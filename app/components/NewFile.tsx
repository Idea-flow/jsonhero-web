import { useState } from "react";
import { DragAndDropForm } from "./DragAndDropForm";
import { Title } from "./Primitives/Title";
import { SampleUrls } from "./SampleUrls";
import { UrlForm } from "./UrlForm";
import { useTheme } from "~/components/ThemeProvider";

export function NewFile() {
  const [showExample, setShowExample] = useState(false);
  const [theme] = useTheme();

  const handleTryExample = () => {
    setShowExample(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <UrlForm />
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}></div>
        </div>
        <div className="relative flex justify-center">
          <span className={`px-4 text-sm ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-500"}`}>
            或者
          </span>
        </div>
      </div>

      <div className="mb-6">
        <DragAndDropForm />
      </div>

      <div className="text-center">
        <button
          onClick={handleTryExample}
          className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-white/30 focus:ring-offset-0 backdrop-blur-sm"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 focus:ring-gray-400 focus:ring-offset-0 backdrop-blur-sm"
          }`}
        >
          示例
        </button>
        {showExample && (
          <div className="mt-4">
            <UrlForm 
              defaultValue={`{
  "title": "JSONHero在线工具站",
  "description": "这是一个JSON在线解析工具",
  "features": [
    "JSON美化",
    "JSON数据类型显示",
    "高亮显示",
    "错误提示"
  ],
  "color": "#0fd59d",
  "date": "2025-10-19",
  "active": true
}`}
              autoSubmit={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}