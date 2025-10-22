import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "~/components/ThemeProvider";
import { useNavigate } from "remix";

interface DragAndDropFormWebProps {
  refreshOnSubmit?: boolean; // 新增参数，控制提交后是刷新页面还是跳转页面
}

export function DragAndDropFormWeb({ refreshOnSubmit = false }: DragAndDropFormWebProps) {
  const [theme] = useTheme();
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const firstFile = acceptedFiles[0];
      
      // 检查文件类型
      if (firstFile.type !== "application/json" && !firstFile.name.endsWith(".json")) {
        alert("请选择 JSON 文件");
        return;
      }

      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        try {
          if (reader.result == null) {
            return;
          }

          let jsonValue: string | undefined = undefined;

          if (typeof reader.result === "string") {
            jsonValue = reader.result;
          } else {
            const decoder = new TextDecoder("utf-8");
            jsonValue = decoder.decode(reader.result);
          }

          // 验证 JSON 格式
          JSON.parse(jsonValue);

          // 存储到 localStorage
          localStorage.setItem("browserJson", jsonValue);

          // 根据 refreshOnSubmit 参数决定是刷新页面还是跳转页面
          if (refreshOnSubmit) {
            window.location.reload();
          } else {
            navigate("/m/m");
          }
        } catch (error) {
          alert("JSON 文件格式错误");
        }
      };
      reader.readAsText(firstFile);
    },
    [refreshOnSubmit, navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    multiple: false,
    accept: "application/json",
  });

  return (
    <div
      {...getRootProps()}
      className={`block w-full min-w-[300px] cursor-pointer rounded-xl border-2 border-dashed p-6 text-base transition-all duration-300 hover:scale-[1.02] ${
        isDragActive 
          ? theme === "dark"
            ? "border-green-500 bg-green-900/10 text-green-400" 
            : "border-green-500 bg-green-100 text-green-700"
          : theme === "dark"
            ? "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-500"
            : "border-gray-300 bg-white/80 text-gray-700 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-3">
        <ArrowCircleDownIcon
          className={`h-10 w-10 ${
            isDragActive 
              ? theme === "dark" ? "text-green-500" : "text-green-600"
              : theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        />
        <div className="text-center">
          <p className={`font-medium ${
            isDragActive 
              ? theme === "dark" ? "text-green-400" : "text-green-700"
              : ""
          }`}>
            {isDragActive
              ? "松开鼠标上传文件"
              : "拖动JSON文件到此，或者点击选择文件"}
          </p>
          <p className={`text-xs mt-1 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}>
            支持 JSON 文件，最大 1MB
          </p>
        </div>
      </div>
    </div>
  );
}