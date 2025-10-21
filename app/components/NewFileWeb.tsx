import { useState, useRef } from "react";
import { DragAndDropForm } from "./DragAndDropForm";
import { Title } from "./Primitives/Title";
import { SampleUrls } from "./SampleUrls";
import { UrlFormWeb } from "./UrlFormWeb";
import { useTheme } from "~/components/ThemeProvider";

export function NewFileWeb() {
  const [showExample, setShowExample] = useState(false);
  const [theme] = useTheme();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTryExample = () => {
    setShowExample(true);
  };

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jsonValue = textAreaRef.current?.value;
    if (jsonValue) {
      try {
        // 验证 JSON 格式是否正确
        JSON.parse(jsonValue);
        // 存储到 localStorage
        localStorage.setItem("browserJson", jsonValue);
        // 跳转到 /m/m 页面
        window.location.href = "/m/m";
      } catch (error) {
        alert("Invalid JSON format");
      }
    }
  };

  const exampleJson = `{
  "title": "ideaflow在线工具站",
  "json.url": "https://tools.ideaflow.top",
  "keywords": "json在线解析",
  "功能": [
    "JSON美化",
    "JSON数据类型显示",
    "JSON数组显示角标",
    "高亮显示",
    "错误提示",
    {
      "备注": [
        "tools.ideaflow.top",
        "tools.ideaflow.top2"
      ]
    }
  ],
  "color": "#0fd59d",
  "date": "2014-01-01",
  "unixtime": "1729736646666",
  "current_wow_in_movie": 3,
  "total_wows_in_movie": 6,
  "poster": "https://images.ctfassets.net/bs8ntwkklfua/6jFEUPmYiKifaTuC2cugm8/22087834d091445fc9393cdd9163a901/Hall_Pass_Poster.jpg",
  "video": {
    "1080p": "https://videos.ctfassets.net/bs8ntwkklfua/4QcL02MHJ8ApVkbfN8cP6E/264c28c1e9195d87f0206e143c5ca54a/Hall_Pass_Wow_3_1080p.mp4",
    "720p": "https://videos.ctfassets.net/bs8ntwkklfua/15h0sMoIhdeaPDB8qSsUN9/36245f66352b595dc40bc4d9903fa5b3/Hall_Pass_Wow_3_720p.mp4",
    "480p": "https://videos.ctfassets.net/bs8ntwkklfua/74fQiVcwuT7ePQemGC7ih4/b102922c97c9ff38f47268d648628a22/Hall_Pass_Wow_3_480p.mp4",
    "360p": "https://videos.ctfassets.net/bs8ntwkklfua/7mSGl1rSVtGdfSacwnKVsu/e7ac36e5684f6b64978987d2f68c43db/Hall_Pass_Wow_3_360p.mp4"
  },
  "audio": "https://assets.ctfassets.net/bs8ntwkklfua/2NBIVPDF4o7cy0epTvPOwR/406cd5c17e9b01511f1e350bb96df352/Hall_Pass_Wow_3.mp3"
}`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <form onSubmit={handleJsonSubmit} className="relative overflow-hidden rounded-xl">
          {/* 弥散光背景装饰 */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 blur-3xl dark:from-pink-900/30 dark:to-purple-900/30"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl dark:from-blue-900/30 dark:to-cyan-900/30"></div>
          
          <div className="relative rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-opacity-50 dark:focus-within:ring-indigo-500/50">
            <textarea
              ref={textAreaRef}
              className={`block w-full text-base py-3 px-4 transition duration-300 focus:outline-none resize-y min-h-[300px] ${
                theme === "dark"
                  ? "text-white placeholder:text-gray-300 bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "text-gray-800 placeholder:text-gray-400 bg-white/80 border border-white/30 backdrop-blur-xl"
              }`}
              placeholder="在此处粘贴 JSON..."
              defaultValue=""
            />
            <div className="flex justify-end p-2">
              <button
                type="submit"
                className={`inline-flex items-center justify-center px-5 py-3 font-medium rounded-md transition-all duration-300 ${
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-indigo-500/50"
                    : "text-white bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus:ring-indigo-300/50"
                }`}
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}></div>
        </div>
        <div className="relative flex justify-center">
          <span className={`px-4 text-sm ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-500"}`}>
            或者 121
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
            <form onSubmit={handleJsonSubmit} className="relative overflow-hidden rounded-xl">
              {/* 弥散光背景装饰 */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 blur-3xl dark:from-pink-900/30 dark:to-purple-900/30"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl dark:from-blue-900/30 dark:to-cyan-900/30"></div>
              
              <div className="relative rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-opacity-50 dark:focus-within:ring-indigo-500/50">
                <textarea
                  ref={textAreaRef}
                  className={`block w-full text-base py-3 px-4 transition duration-300 focus:outline-none resize-y min-h-[300px] ${
                    theme === "dark"
                      ? "text-white placeholder:text-gray-300 bg-white/5 border border-white/10 backdrop-blur-xl"
                      : "text-gray-800 placeholder:text-gray-400 bg-white/80 border border-white/30 backdrop-blur-xl"
                  }`}
                  placeholder="在此处粘贴 JSON..."
                  defaultValue={exampleJson}
                  autoFocus
                />
                <div className="flex justify-end p-2">
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center px-5 py-3 font-medium rounded-md transition-all duration-300 ${
                      theme === "dark"
                        ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-indigo-500/50"
                        : "text-white bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus:ring-indigo-300/50"
                    }`}
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}