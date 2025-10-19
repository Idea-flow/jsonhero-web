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
}
`}
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