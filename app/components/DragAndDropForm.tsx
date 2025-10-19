import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Form, useSubmit } from "remix";
import invariant from "tiny-invariant";
import { useTheme } from "~/components/ThemeProvider";

export function DragAndDropForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const filenameInputRef = useRef<HTMLInputElement>(null);
  const rawJsonInputRef = useRef<HTMLInputElement>(null);
  const [theme] = useTheme();

  const submit = useSubmit();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (!formRef.current || !filenameInputRef.current) {
        return;
      }

      if (acceptedFiles.length === 0) {
        return;
      }

      const firstFile = acceptedFiles[0];

      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
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

        invariant(rawJsonInputRef.current, "rawJsonInputRef is null");
        invariant(jsonValue, "jsonValue is undefined");

        rawJsonInputRef.current.value = jsonValue;

        submit(formRef.current);
      };
      reader.readAsArrayBuffer(firstFile);
      filenameInputRef.current.value = firstFile.name;
    },
    [formRef.current, filenameInputRef.current, rawJsonInputRef.current]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    multiple: false,
    accept: "application/json",
  });

  return (
    <Form method="post" action="/actions/createFromFile" ref={formRef}>
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

        <input type="hidden" name="filename" ref={filenameInputRef} />
        <input type="hidden" name="rawJson" ref={rawJsonInputRef} />
      </div>
    </Form>
  );
}