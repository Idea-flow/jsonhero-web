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
    <div>
      <div className="mb-4">
        <UrlForm />
      </div>
        <DragAndDropForm />

      <div className="mt-4">
        <button
          onClick={handleTryExample}
          className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-white/30 focus:ring-offset-0 backdrop-blur-sm"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 focus:ring-gray-400 backdrop-blur-sm"
          }`}
        >
          尝试示例
        </button>
        {showExample && (
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
        )}
      </div>
      


      {/*<div className="mt-4 pt-5">*/}
      {/*  /!*<Title className="mb-2 text-slate-200">No JSON? Try it out 1:</Title>*!/*/}
      {/*  <SampleUrls />*/}
      {/*</div>*/}
    </div>
  );
}