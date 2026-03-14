/**
 * Admin Legal Content Manager
 *
 * Uses CKEditor 5 for rich text editing.
 *
 * Install before using:
 *   npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
 *
 * Rendered on the landing page via the useLegalContent hook (see below).
 */

import { getApiErrorMessage } from "@/lib/api-error";
import AdminServices from "@/services/admin-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// @ts-ignore — CKEditor types may need separate @types package
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FileText, Save, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DocType = "terms" | "privacy";

const DOCS: { key: DocType; label: string; icon: any; description: string }[] = [
  {
    key: "terms",
    label: "Terms & Conditions",
    icon: FileText,
    description: "Define the terms of service between HireRight and its users",
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    icon: Shield,
    description: "Describe how user data is collected, stored and used",
  },
];

// ─── CKEditor toolbar config ──────────────────────────────────────────────────
const EDITOR_CONFIG = {
  toolbar: [
    "heading", "|",
    "bold", "italic", "underline", "strikethrough", "|",
    "bulletedList", "numberedList", "|",
    "outdent", "indent", "|",
    "link", "blockQuote", "insertTable", "|",
    "undo", "redo",
  ],
  heading: {
    options: [
      { model: "paragraph",  title: "Paragraph", class: "ck-heading_paragraph"  },
      { model: "heading1",   title: "Heading 1", class: "ck-heading_heading1",   view: "h1" },
      { model: "heading2",   title: "Heading 2", class: "ck-heading_heading2",   view: "h2" },
      { model: "heading3",   title: "Heading 3", class: "ck-heading_heading3",   view: "h3" },
    ],
  },
};

// ─── Editor panel ─────────────────────────────────────────────────────────────
function LegalEditor({ docType }: { docType: DocType }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-legal", docType],
    queryFn: () => AdminServices.getLegalContent(docType),
  });

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
      setIsDirty(false);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => AdminServices.saveLegalContent(docType, content),
    onSuccess: () => {
      toast.success("Content saved and published");
      setIsDirty(false);
      queryClient.invalidateQueries({ queryKey: ["admin-legal", docType] });
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to save content")),
  });

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-10 bg-gray-100 rounded" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Last updated */}
      {data?.data?.updated_at && (
        <p className="text-xs text-gray-400">
          Last updated: {new Date(data.data.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      )}

      {/* CKEditor */}
      <div className="border rounded-[10px] overflow-hidden ckeditor-wrapper">
        <CKEditor
          editor={ClassicEditor}
          config={EDITOR_CONFIG}
          data={content}
          onChange={(_: any, editor: any) => {
            setContent(editor.getData());
            setIsDirty(true);
          }}
        />
      </div>

      {/* Save button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {isDirty ? "Unsaved changes — save to publish to the landing page" : "All changes published"}
        </p>
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending || !isDirty}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-[8px] hover:bg-orange-600 transition-colors disabled:opacity-40">
          <Save className="w-4 h-4" />
          {saveMutation.isPending ? "Saving..." : "Save & Publish"}
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminLegal() {
  const [activeDoc, setActiveDoc] = useState<DocType>("terms");
  const active = DOCS.find((d) => d.key === activeDoc)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Legal Content</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage Terms & Conditions and Privacy Policy — changes publish instantly to the landing page
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-3">
        {DOCS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveDoc(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-medium border transition-colors
              ${activeDoc === key
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Editor card */}
      <div className="bg-white border rounded-[12px] p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-gray-900">{active.label}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{active.description}</p>
        </div>
        <LegalEditor key={activeDoc} docType={activeDoc} />
      </div>

      {/* Usage note */}
      <div className="bg-blue-50 border border-blue-100 rounded-[10px] p-4 text-sm text-blue-700">
        <strong>How it works:</strong> Content saved here is stored in the database and rendered on the public landing page at <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">/terms</code> and <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">/privacy</code>.
        Candidates and employers must agree to the Terms & Conditions during registration.
      </div>
    </div>
  );
}