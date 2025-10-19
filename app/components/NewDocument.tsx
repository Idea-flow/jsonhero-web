import { DragAndDropForm } from "./DragAndDropForm";
import { Title } from "./Primitives/Title";
import { SampleUrls } from "./SampleUrls";
import { UrlForm } from "./UrlForm";
import { useTheme } from "./ThemeProvider";
import {useState} from "react";

export function NewDocument() {
  const [theme] = useTheme();
  const [showExample, setShowExample] = useState(false);
  const handleTryExample = () => {
    setShowExample(true);
  };


  return (
    <div className={`rounded-xl shadow-lg w-96 max-w-max p-6 transition border ${
      theme === "dark" 
        ? "bg-slate-800/90 backdrop-blur-sm text-gray-200 border-slate-700" 
        : "bg-white/90 backdrop-blur-sm text-gray-800 border-gray-200"
    }`}>
      <div className="flex flex-col">
        <UrlForm className="mb-4"/>
        <DragAndDropForm/>
        <div className="text-center mt-6">
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


        {/*<div className="mt-6">*/}
        {/*  <Title className={`mb-3 text-sm font-medium ${*/}
        {/*      theme === "dark" ? "text-gray-300" : "text-gray-600"*/}
        {/*  }`}>*/}
        {/*    没有 JSON 文件？试试这些示例：*/}
        {/*  </Title>*/}
        {/*  <SampleUrls/>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}