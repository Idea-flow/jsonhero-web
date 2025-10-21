import { useState, useRef, useEffect } from "react";
import { Form, useTransition } from "remix";
import { useTheme } from "~/components/ThemeProvider";

export type UrlFormProps = {
  className?: string;
  defaultValue?: string;
  autoSubmit?: boolean;
};

export function UrlFormWeb({ className, defaultValue, autoSubmit }: UrlFormProps) {
  const transition = useTransition();
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const formRef = useRef<HTMLFormElement>(null);
  const [theme] = useTheme();

  const isNotIdle = transition.state !== "idle";
  const isButtonDisabled = !inputValue.length || isNotIdle;

  useEffect(() => {
    if (autoSubmit && formRef.current && inputValue) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  }, [autoSubmit, inputValue]);

  return (
    <Form
      method="post"
      action="/actions/createFromUrl"
      className={`${className} relative overflow-hidden rounded-xl`}
      ref={formRef}
    >
      {/* 弥散光背景装饰 */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 blur-3xl dark:from-pink-900/30 dark:to-purple-900/30"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl dark:from-blue-900/30 dark:to-cyan-900/30"></div>
      
      <div className="relative flex rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-opacity-50 dark:focus-within:ring-indigo-500/50">
        <input
          type="text"
          name="jsonUrl"
          id="jsonUrl"
          className={`block flex-grow text-base py-3 px-4 transition duration-300 focus:outline-none ${
            theme === "dark"
              ? "text-white placeholder:text-gray-300 bg-white/5 border border-white/10 backdrop-blur-xl"
              : "text-gray-800 placeholder:text-gray-400 bg-white/80 border border-white/30 backdrop-blur-xl"
          }`}
          placeholder="输入 JSON URL 或在此处粘贴 JSON..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          type="submit"
          value="Go"
          className={`inline-flex items-center justify-center px-5 py-3 font-medium rounded-r-md transition-all duration-300 ${
            theme === "dark"
              ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-indigo-500/50"
              : "text-white bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus:ring-indigo-300/50"
          } ${
            isButtonDisabled && "opacity-60 cursor-not-allowed"
          }`}
          disabled={isButtonDisabled}
        >
          {isNotIdle ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </span>
          ) : "Go"}
        </button>
      </div>
    </Form>
  );
}