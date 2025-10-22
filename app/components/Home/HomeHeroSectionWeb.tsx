import { AutoplayVideo } from "../AutoplayVideo";
import { NewFile } from "../NewFile";
import { NewFileWeb } from "../NewFileWeb";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { useTheme } from "~/components/ThemeProvider";
import { Link, useLocation, useNavigate } from "remix";
import heroVideo from "~/assets/home/JsonHero2.mp4";

const jsonHeroTitle = "JSON 查看器";
const jsonHeroSlogan = "更好的JSON查看工具";

export function HomeHeroSectionWeb() {
  const [theme] = useTheme();

  return (
    <div
      className={`flex items-center justify-center lg:p-6 lg:pb-16 pt-20 lg:pt-32 min-h-screen relative overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-cyan-50"
      }`}
    >
      {/* 弥散光背景装饰 */}
      <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-purple-900/40 to-indigo-900/40" 
          : "bg-gradient-to-br from-pink-200 to-purple-200"
      }`}></div>
      <div className={`absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-cyan-900/40 to-blue-900/40" 
          : "bg-gradient-to-br from-blue-200 to-cyan-200"
      }`}></div>
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-30 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-green-900/40 to-teal-900/40" 
          : "bg-gradient-to-br from-green-200 to-teal-200"
      }`}></div>
      
      <div className="self-center flex items-center md:w-1/2 px-6 pb-8 mt-8 lg:mt-0 relative z-10">
        <div className="max-w-lg text-center mx-auto">
          <ExtraLargeTitle 
            className={theme === "dark" ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" : "text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600"}
          >
            {jsonHeroTitle}
          </ExtraLargeTitle>
          <SmallSubtitle 
            className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {jsonHeroSlogan}
          </SmallSubtitle>
          <div className="flex justify-center">
            <NewFileWeb />
          </div>
        </div>
      </div>
    </div>
  );
}