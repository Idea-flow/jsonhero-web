import { useState, useRef, useEffect } from "react";
import { DragAndDropFormWeb } from "./DragAndDropFormWeb";
import { useTheme } from "~/components/ThemeProvider";
import { UrlFormWeb } from "~/components/UrlFormWeb";

export function NewFileWeb() {
  const [theme] = useTheme();
  const [exampleJson, setExampleJson] = useState<string | null>(null);
  const formRef = useRef<{ submit: () => void }>(null);

  const handleTryExample = () => {
    const json = `{
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
    setExampleJson(json);
  };

  useEffect(() => {
    if (exampleJson && formRef.current) {
      // 稍微延迟执行，确保组件已经渲染完成
      setTimeout(() => {
        formRef.current?.submit();
      }, 0);
    }
  }, [exampleJson]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <UrlFormWeb 
          ref={formRef}
          defaultValue={exampleJson || undefined}
        />
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
        <DragAndDropFormWeb />
      </div>

      <div className="text-center">
        <button
          onClick={handleTryExample}
          className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === "dark"
              ? "text-white bg-gradient-to-r from-purple-900/40 to-indigo-900/40 hover:from-purple-800/60 hover:to-indigo-800/60 border border-white/20 focus:ring-indigo-500/50 focus:ring-offset-0 backdrop-blur-sm shadow-lg"
              : "text-gray-800 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 border border-white/50 focus:ring-indigo-300/50 focus:ring-offset-0 backdrop-blur-sm shadow-md"
          }`}
        >
          <span>试用示例</span>
        </button>
      </div>
    </div>
  );
}