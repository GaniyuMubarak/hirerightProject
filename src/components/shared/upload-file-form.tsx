import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import Icons from "../ui/icons";

type UploadFileFormProps = {
  fieldName: string;
  className?: string;
};

export default function UploadFileForm({
  fieldName = "image",
  className,
}: UploadFileFormProps) {
  const { setValue, watch } = useFormContext();
  const uploadedFile = watch(fieldName);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageData = {
          file,
          url: URL.createObjectURL(file),
          isPending: true,
          name: file.name || "Untitled",
          type: file.type,
          size: file.size,
        };
        setValue(fieldName, imageData);
      }
    },
    [fieldName, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div>
      {uploadedFile?.url ? (
        <div className={cn("relative w-72 border rounded-[12px]", className)}>
          <img
            src={uploadedFile.url}
            alt={uploadedFile.name}
            className="w-full h-48 object-cover rounded-[12px]"
          />
          <button
            onClick={() => setValue(fieldName, null)}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col gap-3 items-center w-72 border rounded-[12px] p-6 py-12 bg-[#F3F3F3] cursor-pointer",
            className
          )}
        >
          <div className="h-10 w-10 flex justify-center items-center">
            <Icons.cloudUpload />
          </div>
          <div className="flex flex-col text-[#475467] text-center space-y-1">
            <p className="text-sm">
              <span className="text-[#EE7B36] font-medium">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </div>
      )}
      <input {...getInputProps()} />
    </div>
  );
}
