import Icons from "../ui/icons";

export default function ResumeForm() {
  return (
    <div>
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Your CV/Resume
        </h2>
      </header>

      <div className="flex gap-6 mt-2">
        <div className="flex gap-3 items-center justify-end w-60 border rounded-[12px] py-4 px-6 h-fit">
          <Icons.pdf />

          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#101828]">
              Joe’s Resume.pdf
            </p>
            <p className="text-sm text-[#475467]">200 KB</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center w-72  border rounded-[12px] py-4 px-6">
          <div className="border rounded-[8px] bg-white shadow-[0px_1px_2px_0px_#1018280D] h-10 w-10 flex justify-center items-center">
            <Icons.cloudUpload />
          </div>
          <div className="flex flex-col text-[#475467] text-center space-y-1">
            <p className="text-sm ">
              <span className="text-[#EE7B36] font-medium">
                Click to upload
              </span>{" "}
              or drag and drop
              <br />
            </p>

            <p className="text-xs"> SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
