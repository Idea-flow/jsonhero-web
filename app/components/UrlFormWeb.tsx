import { useState, useRef } from "react";
import { useTheme } from "~/components/ThemeProvider";

interface UrlFormWebProps {
  defaultValue?: string;
  autoFocus?: boolean;
}

export function UrlFormWeb({
  defaultValue,
  autoFocus
}: UrlFormWebProps) {
  const [theme] = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jsonValue = inputRef.current?.value;
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

  return (
    <form onSubmit={handleJsonSubmit} className="relative overflow-hidden rounded-xl">
      {/* 弥散光背景装饰 */}
      <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30 ${
        theme === "dark"
          ? "bg-gradient-to-br from-purple-900/40 to-indigo-900/40"
          : "bg-gradient-to-br from-pink-200 to-purple-200"
      }`}></div>
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 ${
        theme === "dark"
          ? "bg-gradient-to-br from-cyan-900/40 to-blue-900/40"
          : "bg-gradient-to-br from-blue-200 to-cyan-200"
      }`}></div>

      <div className="relative rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-opacity-50 dark:focus-within:ring-indigo-500/50">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            className={`flex-grow text-base py-3 px-4 transition duration-300 focus:outline-none ${
              theme === "dark"
                ? "text-white placeholder:text-gray-300 bg-white/5 border border-white/10 backdrop-blur-xl"
                : "text-gray-800 placeholder:text-gray-400 bg-white/80 border border-white/30 backdrop-blur-xl"
            }`}
            placeholder="在此处粘贴 JSON URL..."
          />
          <div className="flex items-center p-2 bg-gradient-to-r from-white/80 to-white/40 dark:from-gray-900/50 dark:to-gray-900/30 backdrop-blur-sm border-l border-t border-b border-white/30 dark:border-white/10">
            <button
              type="submit"
              className={`h-full inline-flex items-center justify-center px-6 font-medium rounded-md transition-all duration-300 ${
                theme === "dark"
                  ? "text-white bg-gradient-to-r from-purple-900/40 to-indigo-900/40 hover:from-purple-800/50 hover:to-indigo-800/50 focus:ring-2 focus:ring-indigo-500/50"
                  : "text-gray-800 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 focus:ring-2 focus:ring-indigo-300/50"
              }`}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}