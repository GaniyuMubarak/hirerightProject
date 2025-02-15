import UploadFileForm from "@/components/shared/upload-file-form";
import { getSize } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Icons from "../../ui/icons";

export default function ResumeForm() {
  const form = useFormContext();
  const resume = form.watch("resume");
  console.log("resume ", resume);
  return (
    <div>
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Your CV/Resume
        </h2>
      </header>

      <div className="grid grid-cols-[240px_2fr] gap-6 mt-2">
        <div>
          {resume && (
            <div className="flex gap-3 items-center justify-end w-60 border rounded-[12px] py-4 px-6 h-fit">
              {resume.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <Icons.docx className="min-w-6" />
              ) : (
                <Icons.pdf />
              )}

              <div className="flex flex-col">
                <p className="text-sm font-medium text-[#101828]">
                  {resume?.name}
                </p>
                <p className="text-sm text-[#475467]">
                  {getSize(resume?.size)}
                </p>
              </div>
            </div>
          )}
        </div>
        <UploadFileForm
          fieldName="resume"
          className="bg-white py-4 px-6"
          fileType="PDF, DOCX or TXT"
          iconClassName="border rounded-[8px] bg-white shadow-[0px_1px_2px_0px_#1018280D]"
          accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          review={false}
        />
      </div>
    </div>
  );
}
