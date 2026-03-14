import AdminServices from "@/services/admin-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardPen, Download, Plus, Trash2, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "true_false" | "text";
  options: string[];
  correct_answer: string;
}

interface TestForm {
  title: string;
  description: string;
  duration_minutes: number;
  is_active: boolean;
  questions: Question[];
}

const EMPTY_QUESTION = (): Question => ({
  id: crypto.randomUUID(),
  text: "",
  type: "multiple_choice",
  options: ["", "", "", ""],
  correct_answer: "",
});

const EMPTY_FORM = (): TestForm => ({
  title: "",
  description: "",
  duration_minutes: 30,
  is_active: true,
  questions: [EMPTY_QUESTION()],
});

// ─── CSV template download ────────────────────────────────────────────────────
function downloadTemplate() {
  const headers = ["question_text", "type", "option_a", "option_b", "option_c", "option_d", "correct_answer"];
  const example = [
    "What does HTML stand for?",
    "multiple_choice",
    "HyperText Markup Language",
    "HighText Machine Language",
    "HyperText and links Markup Language",
    "None of the above",
    "HyperText Markup Language",
  ];
  const example2 = [
    "JavaScript is a compiled language",
    "true_false",
    "True",
    "False",
    "",
    "",
    "False",
  ];
  const csv = [headers, example, example2].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "questions_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── CSV parser ───────────────────────────────────────────────────────────────
function parseCSV(text: string): Question[] {
  const lines = text.trim().split("\n").slice(1); // skip header
  return lines
    .filter((l) => l.trim())
    .map((line) => {
      // Handle quoted fields
      const cols: string[] = [];
      let current = "";
      let inQuotes = false;
      for (const ch of line) {
        if (ch === '"') { inQuotes = !inQuotes; }
        else if (ch === "," && !inQuotes) { cols.push(current.trim()); current = ""; }
        else { current += ch; }
      }
      cols.push(current.trim());

      const [text, type, a, b, c, d, correct] = cols;
      const qType = (type === "true_false" ? "true_false" : type === "text" ? "text" : "multiple_choice") as Question["type"];
      const options = qType === "multiple_choice" ? [a, b, c, d].filter(Boolean) : qType === "true_false" ? ["True", "False"] : [];

      return { id: crypto.randomUUID(), text: text || "", type: qType, options, correct_answer: correct || "" };
    })
    .filter((q) => q.text);
}

// ─── Question upload dropzone ─────────────────────────────────────────────────
function QuestionUploader({ onImport }: { onImport: (questions: Question[]) => void }) {
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    setError("");
    const file = accepted[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const questions = parseCSV(text);
        if (questions.length === 0) {
          setError("No valid questions found. Check your CSV format.");
          return;
        }
        onImport(questions);
        toast.success(`${questions.length} question${questions.length !== 1 ? "s" : ""} imported`);
      } catch {
        setError("Failed to parse file. Make sure it matches the template.");
      }
    };
    reader.readAsText(file);
  }, [onImport]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"], "text/plain": [".txt"] },
    multiple: false,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Upload a CSV file to import questions in bulk</p>
        <button
          type="button"
          onClick={downloadTemplate}
          className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium">
          <Download className="w-3.5 h-3.5" />
          Download Template
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-[10px] p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-300 bg-gray-50"}`}>
        <input {...getInputProps()} />
        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          <span className="text-orange-500 font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">CSV file only · matches template format</p>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Question builder (manual entry) ─────────────────────────────────────────
function QuestionBuilder({ question, index, onChange, onRemove }: {
  question: Question; index: number;
  onChange: (q: Question) => void; onRemove: () => void;
}) {
  return (
    <div className="border rounded-[10px] p-4 space-y-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Question {index + 1}</span>
        <button onClick={onRemove} type="button" className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <textarea
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        placeholder="Enter question text..."
        rows={2}
        className="w-full px-3 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
      />

      <select
        value={question.type}
        onChange={(e) => onChange({ ...question, type: e.target.value as Question["type"], options: ["","","",""], correct_answer: "" })}
        className="px-3 py-1.5 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
        <option value="multiple_choice">Multiple Choice</option>
        <option value="true_false">True / False</option>
        <option value="text">Text Answer</option>
      </select>

      {question.type === "multiple_choice" && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${question.id}`}
                checked={question.correct_answer === opt && opt !== ""}
                onChange={() => onChange({ ...question, correct_answer: opt })}
                className="accent-orange-500"
              />
              <input
                value={opt}
                onChange={(e) => {
                  const opts = [...question.options];
                  opts[i] = e.target.value;
                  onChange({ ...question, options: opts });
                }}
                placeholder={`Option ${i + 1}`}
                className="flex-1 px-3 py-1.5 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}
          <p className="text-xs text-gray-400">Select the radio button next to the correct answer</p>
        </div>
      )}

      {question.type === "true_false" && (
        <div className="flex gap-4">
          {["True", "False"].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name={`tf-${question.id}`}
                checked={question.correct_answer === val}
                onChange={() => onChange({ ...question, correct_answer: val })}
                className="accent-orange-500"
              />
              {val}
            </label>
          ))}
        </div>
      )}

      {question.type === "text" && (
        <input
          value={question.correct_answer}
          onChange={(e) => onChange({ ...question, correct_answer: e.target.value })}
          placeholder="Expected answer (used for reference)"
          className="w-full px-3 py-1.5 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      )}
    </div>
  );
}

// ─── Test form modal ──────────────────────────────────────────────────────────
function TestFormModal({ existing, onClose }: { existing?: any; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
  const [form, setForm] = useState<TestForm>(() =>
    existing
      ? { title: existing.title, description: existing.description, duration_minutes: existing.duration_minutes, is_active: existing.is_active, questions: existing.questions ?? [EMPTY_QUESTION()] }
      : EMPTY_FORM()
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      existing ? AdminServices.updateTest(existing.id, form) : AdminServices.createTest(form),
    onSuccess: () => {
      toast.success(existing ? "Test updated" : "Test created");
      queryClient.invalidateQueries({ queryKey: ["admin-tests"] });
      onClose();
    },
    onError: () => toast.error("Failed to save test"),
  });

  const updateQuestion = (index: number, q: Question) => {
    const questions = [...form.questions];
    questions[index] = q;
    setForm({ ...form, questions });
  };

  const handleImport = (imported: Question[]) => {
    setForm({ ...form, questions: [...form.questions.filter((q) => q.text), ...imported] });
    setActiveTab("manual");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-[16px] w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ClipboardPen className="w-5 h-5 text-orange-500" />
            <h2 className="font-semibold text-gray-900">{existing ? "Edit Test" : "Create Test"}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Basic info */}
          <div className="space-y-3">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Test title *"
              className="w-full px-4 py-2.5 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="w-full px-4 py-2.5 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">Duration (mins)</label>
                <input
                  type="number" min={5} max={180}
                  value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
                  className="w-24 px-3 py-2 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox" checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="accent-orange-500"
                />
                Active
              </label>
            </div>
          </div>

          {/* Questions section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Questions {form.questions.filter((q) => q.text).length > 0 && `(${form.questions.filter((q) => q.text).length})`}
              </h3>
              {/* Tab switcher */}
              <div className="flex border rounded-[8px] overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("manual")}
                  className={`px-3 py-1.5 font-medium transition-colors ${activeTab === "manual" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  Manual
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`px-3 py-1.5 font-medium transition-colors ${activeTab === "upload" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  Upload CSV
                </button>
              </div>
            </div>

            {activeTab === "upload" && (
              <QuestionUploader onImport={handleImport} />
            )}

            {activeTab === "manual" && (
              <>
                {form.questions.map((q, i) => (
                  <QuestionBuilder
                    key={q.id} question={q} index={i}
                    onChange={(updated) => updateQuestion(i, updated)}
                    onRemove={() => setForm({ ...form, questions: form.questions.filter((_, idx) => idx !== i) })}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, questions: [...form.questions, EMPTY_QUESTION()] })}
                  className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium">
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {form.questions.filter((q) => q.text).length} question{form.questions.filter((q) => q.text).length !== 1 ? "s" : ""} ready
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} type="button"
              className="px-4 py-2 text-sm border rounded-[8px] text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.title.trim()}
              className="px-4 py-2 text-sm bg-orange-500 text-white rounded-[8px] hover:bg-orange-600 transition-colors disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : existing ? "Save Changes" : "Create Test"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminTests() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [editingTest, setEditingTest] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-tests"],
    queryFn: () => AdminServices.getTests(),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      AdminServices.toggleTestStatus(id, is_active),
    onSuccess: () => {
      toast.success("Test status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-tests"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => AdminServices.deleteTest(id),
    onSuccess: () => {
      toast.success("Test deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-tests"] });
    },
    onError: () => toast.error("Failed to delete test"),
  });

  const tests = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
          <p className="text-gray-500 text-sm mt-1">Create and manage onboarding tests — type questions manually or upload a CSV</p>
        </div>
        <button
          onClick={() => { setEditingTest(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-[8px] hover:bg-orange-600 transition-colors">
          <Plus className="w-4 h-4" /> New Test
        </button>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-2 gap-4 animate-pulse">
          {[1,2,3,4].map((i) => <div key={i} className="h-36 bg-gray-100 rounded-[12px]" />)}
        </div>
      ) : tests.length === 0 ? (
        <div className="bg-white border rounded-[12px] p-12 text-center">
          <ClipboardPen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No tests created yet</p>
          <button
            onClick={() => { setEditingTest(null); setModalOpen(true); }}
            className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium">
            Create your first test
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {tests.map((test: any) => (
            <div key={test.id} className="bg-white border rounded-[12px] p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{test.title}</h3>
                  {test.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{test.description}</p>}
                </div>
                <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                  ${test.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {test.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{test.questions_count} questions</span>
                <span>{test.duration_minutes} mins</span>
                <span>{test.assigned_jobs} job{test.assigned_jobs !== 1 ? "s" : ""} assigned</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setEditingTest(test); setModalOpen(true); }}
                  className="text-xs px-3 py-1.5 border rounded-[6px] text-gray-600 hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => toggleMutation.mutate({ id: test.id, is_active: !test.is_active })}
                  disabled={toggleMutation.isPending}
                  className={`text-xs px-3 py-1.5 rounded-[6px] transition-colors
                    ${test.is_active ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                  {test.is_active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => deleteMutation.mutate(test.id)}
                  disabled={deleteMutation.isPending}
                  className="text-xs px-3 py-1.5 rounded-[6px] bg-red-50 text-red-600 hover:bg-red-100 transition-colors ml-auto">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <TestFormModal
          existing={editingTest}
          onClose={() => { setModalOpen(false); setEditingTest(null); }}
        />
      )}
    </div>
  );
}