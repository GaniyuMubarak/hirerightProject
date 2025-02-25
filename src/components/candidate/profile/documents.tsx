import File from "../../shared/file";
import Icons from "../../ui/icons";

export default function ProfileDocuments() {
  return (
    <div className="space-y-5 border-b pb-5">
      <h2 className="text-xl font-semibold text-[#020C10]">Documents</h2>
      <div className="flex max-lg:flex-col gap-5">
        <File icon={<Icons.pdf />} title="Joe’s Resume.pdf" size="200 KB" />
        <File icon={<Icons.docx />} title="Cover Letter.doc" size="200 KB" />
      </div>
    </div>
  );
}
