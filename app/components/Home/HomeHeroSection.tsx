import { AutoplayVideo } from "../AutoplayVideo";
import { NewFile } from "../NewFile";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { useTheme } from "~/components/ThemeProvider";

import heroVideo from "~/assets/home/JsonHero2.mp4";

const jsonHeroTitle = "JSON 查看器";
const jsonHeroSlogan = "更好的JSON查看工具";

export function HomeHeroSection() {
  const [theme] = useTheme();

  console.log("当前主题：", theme);

  return (
    <div
      className={`flex items-center justify-center lg:p-6 lg:pb-16 pt-20 lg:pt-32 min-h-screen ${
        theme === "dark" ? "bg-[#000000]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="self-center flex items-center md:w-1/2 px-6 pb-8 mt-8 lg:mt-0">
        <div className="max-w-lg text-center mx-auto">
          <ExtraLargeTitle 
            className={theme === "dark" ? "text-purple-400" : "text-lime-500"}
          >
            {jsonHeroTitle}
          </ExtraLargeTitle>
          <SmallSubtitle 
            className={`mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {jsonHeroSlogan}
          </SmallSubtitle>
          <div className="flex justify-center">
            <NewFile />
          </div>
        </div>
      </div>
    </div>
  );
}