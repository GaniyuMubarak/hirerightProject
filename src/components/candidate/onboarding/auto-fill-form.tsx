import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function AutoFillForm() {
  return (
    <div className="bg-[#F8F8FD] rounded-[8px] py-6 px-4 space-y-4">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Autofill</h2>
        <p className="text-[#475467] text-sm">
          Upload you cv or use your LinkedIn profile to autofill your
          information
        </p>
      </header>

      <div className="flex gap-6 justify-center">
        {/* <div className="flex gap-3 items-center justify-end w-60 border rounded-[12px] py-4 px-6 h-fit">
          <Icons.pdf />

          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#101828]">
              Joe’s Resume.pdf
            </p>
            <p className="text-sm text-[#475467]">200 KB</p>
          </div>
        </div> */}
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

      <p className="text-center text-lg text-black font-semibold">OR</p>

      <div className="flex justify-center">
        <Button
          type="button"
          className="bg-[#0A66C2] rounded-[6px] h-[60px] w-fit px-11"
          disabled
        >
          <div className="bg-white p-0.5 rounded-[2px] ">
            <Icons.linkedin />
          </div>{" "}
          Sign up with LinkedIn
        </Button>
      </div>
    </div>
  );
}
