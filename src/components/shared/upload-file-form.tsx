// import { cn } from "@/lib/utils";
// import { X } from "lucide-react";
// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useFormContext } from "react-hook-form";
// import Icons from "../ui/icons";

// type UploadFileFormProps = {
//   fieldName: string;
//   className?: string;
//   fileType?: string;
//   iconClassName?: string;
//   accept?: string;
//   review?: boolean;
// };

// // ✅ useDropzone requires accept as { "mime/type": [] } — not a comma-separated string
// // This converts "image/*,application/pdf" → { "image/*": [], "application/pdf": [] }
// function parseAccept(accept: string): Record<string, string[]> {
//   return accept
//     .split(",")
//     .map((s) => s.trim())
//     .filter(Boolean)
//     .reduce(
//       (acc, mimeType) => {
//         acc[mimeType] = [];
//         return acc;
//       },
//       {} as Record<string, string[]>,
//     );
// }

// export default function UploadFileForm({
//   fieldName = "image",
//   className,
//   fileType = "SVG, PNG, JPG or GIF (max. 800x400px)",
//   iconClassName,
//   accept = "image/*",
//   review = true,
// }: UploadFileFormProps) {
//   const { setValue, watch } = useFormContext();
//   const uploadedFile = watch(fieldName);

//   const onDrop = useCallback(
//     (acceptedFiles: any) => {
//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const file = acceptedFiles[0];
//         const imageData = {
//           file,
//           url: URL.createObjectURL(file),
//           isPending: true,
//           name: file.name || "Untitled",
//           type: file.type,
//           size: file.size,
//         };
//         setValue(fieldName, imageData);
//       }
//     },
//     [fieldName, setValue],
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: parseAccept(accept), // ✅ properly parsed
//     multiple: false,
//   });

//   return (
//     <div>
//       {uploadedFile?.url && review ? (
//         <div className={cn("relative w-72 border rounded-[12px]", className)}>
//           <img
//             src={uploadedFile.url}
//             alt={uploadedFile.name}
//             className="w-full h-48 object-cover rounded-[12px]"
//           />
//           <button
//             type="button"
//             onClick={() => setValue(fieldName, undefined)} // ✅ null → undefined avoids React warning
//             className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           {...getRootProps()}
//           className={cn(
//             "flex flex-col gap-3 items-center w-72 border rounded-[12px] p-6 py-12 bg-[#F3F3F3] cursor-pointer",
//             className,
//           )}>
//           <div
//             className={cn(
//               "h-10 w-10 flex justify-center items-center",
//               iconClassName,
//             )}>
//             <Icons.cloudUpload />
//           </div>
//           <div className="flex flex-col text-[#475467] text-center space-y-1">
//             <p className="text-sm">
//               <span className="text-[#EE7B36] font-medium">
//                 Click to upload
//               </span>{" "}
//               or drag and drop
//             </p>
//             <p className="text-xs">{fileType}</p>
//           </div>
//         </div>
//       )}
//       <input {...getInputProps()} />
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import Icons from "../ui/icons";

type UploadFileFormProps = {
  fieldName: string;
  className?: string;
  fileType?: string;
  iconClassName?: string;
  accept?: string;
  review?: boolean;
  // ✅ Fix #6: validation runs inside onDrop before setValue — invalid files
  // never enter form state, eliminating the useEffect race condition in parent.
  // Return { valid: false, error: "message" } to block the file.
  onValidate?: (file: File) => { valid: boolean; error?: string };
};

// useDropzone requires accept as { "mime/type": [] } — not a comma-separated string
function parseAccept(accept: string): Record<string, string[]> {
  return accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .reduce(
      (acc, mimeType) => {
        acc[mimeType] = [];
        return acc;
      },
      {} as Record<string, string[]>,
    );
}

export default function UploadFileForm({
  fieldName = "image",
  className,
  fileType = "SVG, PNG, JPG or GIF (max. 800x400px)",
  iconClassName,
  accept = "image/*",
  review = true,
  onValidate,
}: UploadFileFormProps) {
  const { setValue, watch, setError, clearErrors } = useFormContext();
  const uploadedFile = watch(fieldName);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // ✅ Fix #6: run validation before setValue — file never enters form state if invalid
      if (onValidate) {
        const { valid, error } = onValidate(file);
        if (!valid) {
          setError(fieldName, { type: "manual", message: error });
          return; // block the file — setValue never called
        }
        clearErrors(fieldName);
      }

      setValue(fieldName, {
        file,
        url: URL.createObjectURL(file),
        isPending: true,
        name: file.name || "Untitled",
        type: file.type,
        size: file.size,
      });
    },
    [fieldName, setValue, setError, clearErrors, onValidate],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: parseAccept(accept),
    multiple: false,
  });

  return (
    <div>
      {uploadedFile?.url && review ? (
        <div className={cn("relative w-72 border rounded-[12px]", className)}>
          <img
            src={uploadedFile.url}
            alt={uploadedFile.name}
            className="w-full h-48 object-cover rounded-[12px]"
          />
          <button
            type="button"
            onClick={() => setValue(fieldName, undefined)}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col gap-3 items-center w-72 border rounded-[12px] p-6 py-12 bg-[#F3F3F3] cursor-pointer",
            className,
          )}>
          <div
            className={cn(
              "h-10 w-10 flex justify-center items-center",
              iconClassName,
            )}>
            <Icons.cloudUpload />
          </div>
          <div className="flex flex-col text-[#475467] text-center space-y-1">
            <p className="text-sm">
              <span className="text-[#EE7B36] font-medium">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs">{fileType}</p>
          </div>
        </div>
      )}
      <input {...getInputProps()} />
    </div>
  );
}