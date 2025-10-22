import { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { useTheme } from "~/components/ThemeProvider";
import { Link, useNavigate } from "remix";

interface UrlFormWebProps {
  defaultValue?: string;
  autoFocus?: boolean;
  onJsonSubmit?: (jsonValue: string) => void;
  refreshOnSubmit?: boolean; // 新增参数，控制提交后是刷新页面还是跳转页面
}

export interface UrlFormWebRef {
  submit: () => void;
}

export const UrlFormWeb = forwardRef<UrlFormWebRef, UrlFormWebProps>(({
  defaultValue,
  autoFocus,
  onJsonSubmit,
  refreshOnSubmit = false // 默认为跳转页面
}, ref) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 当 defaultValue 更新时，更新 input 的值
  useEffect(() => {
    if (defaultValue && inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  const handleJsonSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const jsonValue = inputRef.current?.value;
    if (jsonValue) {
      try {
        // 验证 JSON 格式是否正确
        JSON.parse(jsonValue);
        // 存储到 localStorage
        localStorage.setItem("browserJson", jsonValue);

        console.log("Stored JSON in localStorage:", jsonValue);
        
        // 如果父组件提供了 onJsonSubmit 回调，则调用它
        if (onJsonSubmit) {
          onJsonSubmit(jsonValue);
        } else {
          // 根据 refreshOnSubmit 参数决定是刷新页面还是跳转页面
          if (refreshOnSubmit) {
            window.location.reload();
          } else {
            navigate("/m/m");
          }
        }
      } catch (error) {
        alert("Invalid JSON format");
      }
    }
  };

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    submit: () => handleJsonSubmit()
  }));

  return (
    <form ref={formRef} onSubmit={handleJsonSubmit} className="relative overflow-hidden rounded-xl">
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

      <div className="relative rounded-lg overflow-hidden transition-all duration-300">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            className={`flex-grow text-base py-3 px-4 transition duration-300 focus:outline-none ${
              theme === "dark"
                ? "text-white placeholder:text-gray-300 bg-white/5 border border-white/10 backdrop-blur-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
                : "text-gray-800 placeholder:text-gray-400 bg-white/80 border border-white/30 backdrop-blur-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
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
});