import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import TestService, { 
  type CreateTestData, 
  type QuestionData as ServiceQuestionData,
  type OptionData as ServiceOptionData 
} from "@/services/test-services";

// Icons
const Icons = {
  cloudUpload: () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
};

// Types
interface TestTypeFormProps {
  step: number;
  setStep: (step: number) => void;
  testType?: "single" | "multiple";
}

type CreationMethod = "upload" | "manual" | "both";
type ActiveTab = "upload" | "manual";

interface FormValues {
  testName: string;
  duration: string;
  experienceLevel: string;
  description: string;
  submission_type: string;
  visibility_type: string;
  questionCount?: number;
  passingScore?: number;
  questionType?: string;
}

interface LocalQuestionData {
  id?: string;
  text: string;
  type: "single_choice" | "multiple_choice" | "true_false" | "short_answer";
  points?: number;
  options?: {
    id?: string;
    text: string;
    is_correct: boolean;
    points?: number;
  }[];
}

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const VALID_FILE_TYPES = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const DURATION_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
  { value: "120", label: "120 minutes" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "executive", label: "Executive" },
];

const SUBMISSION_TYPES = [
  { value: "online", label: "Online" },
  { value: "document_upload", label: "Document Upload" },
  { value: "both", label: "Both" },
];

const VISIBILITY_TYPES = [
  { value: "view_before_start", label: "View Before Start" },
  { value: "hidden_until_start", label: "Hidden Until Start" },
];

// Helper Functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (!VALID_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Please upload a valid file (Images, PDF, or Word documents)",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "File size should be less than 10MB",
    };
  }

  return { isValid: true };
};

const getFileIcon = (file: File | null) => {
  if (!file) return <Icons.cloudUpload />;
  
  if (file.type.startsWith("image/")) {
    return <div className="text-green-600">📷</div>;
  } else if (file.type === "application/pdf") {
    return <div className="text-red-600">📄</div>;
  } else if (file.type.includes("word") || file.type.includes("document")) {
    return <div className="text-blue-600">📝</div>;
  }
  return <div className="text-gray-600">📎</div>;
};

// Tab Button Component
const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

// Convert local question to API format
const convertQuestionToApiFormat = (question: LocalQuestionData, order: number): ServiceQuestionData => {
  const baseQuestion: any = {
    question_text: question.text,
    question_type: question.type,
    order: order,
  };
  
  // Add points only if defined
  if (question.points !== undefined && question.points !== null) {
    baseQuestion.points = Number(question.points);
  }
  
  // Add settings if needed
  baseQuestion.settings = null;
  
  return baseQuestion;
};

// Convert local options to API format
const convertOptionsToApiFormat = (options: LocalQuestionData['options']): ServiceOptionData[] => {
  if (!options) return [];
  
  return options
    .filter(opt => opt.text.trim() !== "")
    .map((opt, idx) => {
      // Based on common Laravel API patterns
      const optionObj: any = {
        text: opt.text, // Most Laravel APIs expect 'text' not 'option_text'
        is_correct: Boolean(opt.is_correct),
        order: idx + 1, // Usually order starts from 1
      };
      
      // Only add points if it's defined and not null
      if (opt.points !== undefined && opt.points !== null) {
        optionObj.points = Number(opt.points);
      }
      
      return optionObj;
    });
};

export default function TestTypeForm({
  step,
  setStep,
  testType = "single",
}: TestTypeFormProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      testName: "",
      duration: "",
      experienceLevel: "",
      description: "",
      submission_type: "online",
      visibility_type: "view_before_start",
      questionCount: testType === "multiple" ? 1 : 0,
      passingScore: testType === "multiple" ? 70 : 0,
      questionType: "single_choice",
    },
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [creationMethod, setCreationMethod] = useState<CreationMethod>("both");
  const [activeTab, setActiveTab] = useState<ActiveTab>("upload");
  const [questions, setQuestions] = useState<LocalQuestionData[]>([
    {
      text: "",
      type: "single_choice",
      points: 5,
      options: [
        { id: generateId(), text: "", is_correct: true, points: 5 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Title based on test type
  const title = testType === "multiple" 
    ? "Multiple Question Test" 
    : "Single Question Test";

  // File Handlers
  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error || "Invalid file");
      return;
    }

    setUploadedFile(file);
    toast.success("File uploaded successfully");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-primary", "bg-blue-50");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-primary", "bg-blue-50");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-primary", "bg-blue-50");

    const file = event.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Question Handlers
  const addQuestion = () => {
    const newQuestion: LocalQuestionData = {
      id: generateId(),
      text: "",
      type: "single_choice",
      points: 5,
      options: [
        { id: generateId(), text: "", is_correct: true, points: 5 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      toast.info("Question removed");
    }
  };

  const updateQuestionText = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], text };
    setQuestions(newQuestions);
  };

  const updateQuestionType = (index: number, type: LocalQuestionData["type"]) => {
    const newQuestions = [...questions];
    newQuestions[index] = { 
      ...newQuestions[index], 
      type,
      options: (type === "single_choice" || type === "multiple_choice") ? [
        { id: generateId(), text: "", is_correct: true, points: 5 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
        { id: generateId(), text: "", is_correct: false, points: 0 },
      ] : undefined
    };
    setQuestions(newQuestions);
  };

  const updateQuestionPoints = (index: number, points: number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], points };
    setQuestions(newQuestions);
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    text: string
  ) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options![optionIndex].text = text;
      setQuestions(newQuestions);
    }
  };

  const updateOptionPoints = (
    questionIndex: number,
    optionIndex: number,
    points: number
  ) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options![optionIndex].points = points;
      setQuestions(newQuestions);
    }
  };

  const toggleCorrectOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      // For single choice, only one can be correct
      if (questions[questionIndex].type === "single_choice") {
        // Reset all to false
        newQuestions[questionIndex].options!.forEach((opt, idx) => {
          opt.is_correct = idx === optionIndex;
        });
      } else {
        // For multiple choice, toggle the selected one
        newQuestions[questionIndex].options![optionIndex].is_correct = 
          !newQuestions[questionIndex].options![optionIndex].is_correct;
      }
      setQuestions(newQuestions);
    }
  };

  // Clear all questions
  const clearAllQuestions = () => {
    setQuestions([
      {
        text: "",
        type: "single_choice",
        points: 5,
        options: [
          { id: generateId(), text: "", is_correct: true, points: 5 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
        ],
      },
    ]);
    toast.info("All questions cleared");
  };

  // Remove empty questions
  const removeEmptyQuestions = () => {
    const filteredQuestions = questions.filter(q => q.text.trim() !== "");
    if (filteredQuestions.length === 0) {
      filteredQuestions.push({
        text: "",
        type: "single_choice",
        points: 5,
        options: [
          { id: generateId(), text: "", is_correct: true, points: 5 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
        ],
      });
    }
    setQuestions(filteredQuestions);
    toast.info("Empty questions removed");
  };

  // Validation
  const validateForm = (): string | null => {
    const formData = form.getValues();

    if (!formData.testName.trim()) {
      return "Test name is required";
    }

    if (!formData.duration) {
      return "Duration is required";
    }

    if (!formData.experienceLevel) {
      return "Experience level is required";
    }

    if (!formData.submission_type) {
      return "Submission type is required";
    }

    if (!formData.visibility_type) {
      return "Visibility type is required";
    }

    if (testType === "single") {
      if (creationMethod === "upload" && !uploadedFile) {
        return "Please upload a file for single question test";
      }
      if (
        creationMethod === "manual" &&
        (!questions[0]?.text || questions[0].text.trim() === "")
      ) {
        return "Please enter a question";
      }
      if (creationMethod === "both") {
        if (
          !uploadedFile &&
          (!questions[0]?.text || questions[0].text.trim() === "")
        ) {
          return "Please either upload a file or enter a question";
        }
      }
    }

    if (testType === "multiple") {
      if (creationMethod === "upload" && !uploadedFile) {
        return "Please upload a file containing questions";
      }
      if (creationMethod === "manual") {
        const hasQuestions = questions.some((q) => q.text.trim() !== "");
        if (!hasQuestions) {
          return "Please add at least one question";
        }
      }
      if (creationMethod === "both") {
        if (!uploadedFile && questions.every((q) => q.text.trim() === "")) {
          return "Please either upload a file or add questions";
        }
      }
    }

    // Validate questions
    for (const [index, question] of questions.entries()) {
      if (question.text.trim() === "") continue;
      
      if ((question.type === "single_choice" || question.type === "multiple_choice") && question.options) {
        const hasCorrectOption = question.options.some((opt) => opt.is_correct);
        if (!hasCorrectOption) {
          return `Question ${index + 1} needs at least one correct option`;
        }
        
        // Check for empty options
        const emptyOptions = question.options.filter(opt => opt.text.trim() === "");
        if (emptyOptions.length > 0) {
          return `Question ${index + 1} has empty options`;
        }
      }
    }

    return null;
  };

  // Prepare test data for API
  const prepareTestData = (): CreateTestData => {
    const formData = form.getValues();

    return {
      title: formData.testName,
      time_limit: parseInt(formData.duration) || 30,
      experience_level: formData.experienceLevel,
      description: formData.description || "",
      submission_type: formData.submission_type,
      visibility_type: formData.visibility_type,
      test_type: testType,
      creation_method: creationMethod,
      question_count: formData.questionCount || 0,
      passing_score: formData.passingScore || 0,
      question_type: formData.questionType || "multiple_choice",
      status: "draft",
    };
  };

  // Form Submission using TestService
  const handleProceed = async () => {
    try {
      setIsLoading(true);
      setUploadProgress(0);

      // Validate form
      const validationError = validateForm();
      if (validationError) {
        toast.error(validationError);
        setIsLoading(false);
        return;
      }

      // Step 1: Create the test using TestService
      const testData = prepareTestData();
      setUploadProgress(20);
      
      console.log("[Form] Creating test with data:", testData);
      
      const createdTest = await TestService.createTest(testData);
      
      const testId = createdTest.id;
      if (!testId) {
        throw new Error("Test ID not returned from server");
      }

      console.log("[Form] Test created with ID:", testId);
      setUploadProgress(40);

      // Step 2: Handle file upload
      if (uploadedFile && creationMethod !== "manual") {
        try {
          await TestService.uploadFile(testId, uploadedFile);
          setUploadProgress(70);
          toast.success("File uploaded successfully");
        } catch (uploadError) {
          console.error("[Form] File upload failed:", uploadError);
          toast.warning("File upload failed, continuing with manual questions");
        }
      }

      // Step 3: Handle manual questions
      if (creationMethod !== "upload") {
        const validQuestions = questions.filter((q) => q.text.trim() !== "");
        
        console.log(`[Form] Processing ${validQuestions.length} valid questions`);
        
        if (validQuestions.length > 0) {
          for (let i = 0; i < validQuestions.length; i++) {
            const question = validQuestions[i];
            
            console.log(`[Form] Question ${i + 1} data:`, question);
            
            try {
              // Prepare question data for service
              const questionData = convertQuestionToApiFormat(question, i + 1);
              console.log(`[Form] Converted question data:`, questionData);
              
              // Add question using TestService
              const createdQuestion = await TestService.addQuestion(testId, questionData);
              console.log(`[Form] Created question response:`, createdQuestion);
              
              const questionId = createdQuestion.id;
              console.log(`[Form] Question created with ID: ${questionId}`);

              // Add options for choice questions
              if (
                questionId &&
                (question.type === "single_choice" || question.type === "multiple_choice") &&
                question.options &&
                question.options.some(opt => opt.text.trim() !== "")
              ) {
                const validOptions = convertOptionsToApiFormat(question.options);
                console.log(`[Form] Converted options for question ${questionId}:`, validOptions);
                
                if (validOptions.length > 0) {
                  try {
                    const optionsResult = await TestService.addOptions(testId, questionId, validOptions);
                    console.log(`[Form] Options added successfully for question ${questionId}:`, optionsResult);
                  } catch (optionsError: any) {
                    console.error(`[Form] Failed to add options to question ${questionId}:`, optionsError);
                    
                    // Log the exact error details
                    if (optionsError.response) {
                      console.error(`[Form] Error response:`, optionsError.response.data);
                      console.error(`[Form] Error status:`, optionsError.response.status);
                    }
                    
                    // Continue without options - at least the question is created
                    toast.warning(`Options failed for question ${i + 1}, but question was saved`);
                  }
                } else {
                  console.log(`[Form] No valid options for question ${questionId}`);
                }
              }

              // Update progress
              setUploadProgress(70 + Math.round((i / validQuestions.length) * 25));
              
            } catch (questionError: any) {
              console.error(`[Form] Failed to create question ${i + 1}:`, questionError);
              
              if (questionError.response) {
                console.error(`[Form] Error response:`, questionError.response.data);
                console.error(`[Form] Error status:`, questionError.response.status);
              }
              
              toast.warning(`Failed to create question ${i + 1}, continuing with others`);
              // Continue with other questions
            }
          }
        } else {
          console.log('[Form] No valid questions to process');
        }
      }

      setUploadProgress(100);

      toast.success("Test created successfully!");

      // Move to next step
      setTimeout(() => {
        // setStep(step + 1);
        window.location.href = `/employer/tests`;
      }, 1000);

    } catch (error: any) {
      console.error("[Form] Error creating test:", error);
      
      // Extract error message from response
      let errorMessage = "Failed to create test. Please try again.";
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(", ");
        errorMessage = `Validation failed: ${errorMessages}`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  // Clear form
  const clearForm = () => {
    form.reset({
      testName: "",
      duration: "",
      experienceLevel: "",
      description: "",
      submission_type: "online",
      visibility_type: "view_before_start",
      questionCount: testType === "multiple" ? 1 : 0,
      passingScore: testType === "multiple" ? 70 : 0,
      questionType: "single_choice",
    });
    setQuestions([
      {
        text: "",
        type: "single_choice",
        points: 5,
        options: [
          { id: generateId(), text: "", is_correct: true, points: 5 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
          { id: generateId(), text: "", is_correct: false, points: 0 },
        ],
      },
    ]);
    setUploadedFile(null);
    
    toast.info("Form cleared");
  };

  // Render Methods
  const renderFileUpload = () => (
    <div className="space-y-1.5 col-span-2">
      <Label className="text-[#475467]">
        Upload Document {uploadedFile && `- ${uploadedFile.name}`}
      </Label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".svg,.png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
        className="hidden"
      />
      <div
        className="flex flex-col gap-3 items-center w-full border-2 border-dashed rounded-[12px] p-6 py-12 cursor-pointer hover:border-primary hover:bg-blue-50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <>
            <div className="h-10 w-10 flex justify-center items-center border rounded-[8px] shadow-[0px_1px_2px_0px_#1018280D] bg-green-50 border-green-200">
              {getFileIcon(uploadedFile)}
            </div>
            <div className="flex flex-col text-[#475467] text-center space-y-1">
              <p className="text-sm font-medium text-green-600">
                File uploaded successfully!
              </p>
              <p className="text-sm">{uploadedFile.name}</p>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (uploadedFile) {
                      window.open(URL.createObjectURL(uploadedFile), "_blank");
                    }
                  }}
                >
                  Preview
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-10 w-10 flex justify-center items-center border rounded-[8px] shadow-[0px_1px_2px_0px_#1018280D]">
              {getFileIcon(null)}
            </div>
            <div className="flex flex-col text-[#475467] text-center space-y-1">
              <p className="text-sm">
                <span className="text-[#EE7B36] font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs">
                Images, PDF, or Word documents (max. 10MB)
              </p>
            </div>
          </>
        )}
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-center mt-1">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );

  const renderManualCreation = () => (
    <div className="space-y-4 col-span-2">
      <div className="flex justify-between items-center">
        <Label className="text-[#475467]">Create Questions Manually</Label>
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addQuestion}
          >
            <span className="mr-2">+</span>
            Add Question
          </Button>
          {questions.length > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={removeEmptyQuestions}
            >
              Clear Empty
            </Button>
          )}
        </div>
      </div>
      <div className="max-h-96 border rounded-lg p-4 overflow-y-auto">
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id || index}
              className="space-y-2 border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <Label htmlFor={`question-${index}`}>
                  Question {index + 1}
                </Label>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <span>🗑️</span>
                  </Button>
                )}
              </div>
              <Textarea
                id={`question-${index}`}
                placeholder="Enter your question here..."
                value={question.text}
                onChange={(e) => updateQuestionText(index, e.target.value)}
                rows={2}
                className="resize-none"
              />
              
              {/* Question Points */}
              <div className="mt-2">
                <Label className="text-sm font-normal text-gray-600 mb-1 block">
                  Points
                </Label>
                <Input
                  type="number"
                  placeholder="Points for this question"
                  value={question.points || 5}
                  onChange={(e) => updateQuestionPoints(index, parseInt(e.target.value) || 5)}
                  className="h-8"
                  min="1"
                  max="100"
                />
              </div>
              
              <div className="mt-2">
                <Label className="text-sm font-normal text-gray-600 mb-1 block">
                  Question Type
                </Label>
                <Select
                  value={question.type}
                  onValueChange={(value: LocalQuestionData["type"]) => 
                    updateQuestionType(index, value)
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_choice">
                      Single Choice
                    </SelectItem>
                    <SelectItem value="multiple_choice">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="true_false">True/False</SelectItem>
                    <SelectItem value="short_answer">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(question.type === "single_choice" || question.type === "multiple_choice") && question.options && (
                <div className="space-y-2 mt-3 pl-4">
                  <Label className="text-sm font-normal text-gray-600">
                    Options {question.type === "single_choice" ? "(select one correct answer)" : "(select all correct answers)"}
                  </Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={option.id || optionIndex} className="flex items-center space-x-2">
                      <div className="flex-1 flex space-x-2">
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          className="h-8 text-sm flex-1"
                          value={option.text}
                          onChange={(e) =>
                            updateQuestionOption(index, optionIndex, e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Points"
                          className="h-8 text-sm w-20"
                          value={option.points || 0}
                          onChange={(e) =>
                            updateOptionPoints(index, optionIndex, parseInt(e.target.value) || 0)
                          }
                          min="0"
                          max="100"
                        />
                      </div>
                      <input
                        type={question.type === "single_choice" ? "radio" : "checkbox"}
                        name={`correct-answer-${index}`}
                        value={optionIndex}
                        className="h-4 w-4"
                        checked={option.is_correct}
                        onChange={() => toggleCorrectOption(index, optionIndex)}
                      />
                      <Label className="text-xs whitespace-nowrap">Correct</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {questions.filter(q => q.text.trim() !== "").length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <div className="text-3xl mb-2">📄</div>
          <p className="text-gray-500">No questions added yet</p>
          <p className="text-sm text-gray-400">
            Click "Add Question" to get started
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] font-semibold text-[#1B1B1C]">{title}</h1>
      
      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearForm}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear Form
        </Button>
      </div>

      <div className="gap-1.5 flex flex-col">
        <Form {...form}>
          <div className="grid grid-cols-2 gap-6">
            {/* Basic Information */}
            <FormField
              control={form.control}
              name="testName"
              rules={{ 
                required: "Test name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" }
              }}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="flex items-center">
                    Test Name <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Enter test name" 
                        {...field} 
                        className="pr-10"
                      />
                      {field.value && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                          {field.value.length}/100
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Duration <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceLevel"
              rules={{ required: "Experience level is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Experience Level <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submission Type */}
            <FormField
              control={form.control}
              name="submission_type"
              rules={{ required: "Submission type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Submission Type <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select submission type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBMISSION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Visibility Type */}
            <FormField
              control={form.control}
              name="visibility_type"
              rules={{ required: "Visibility type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Visibility <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility type" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISIBILITY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        rows={3}
                        placeholder="Describe the test..."
                        {...field}
                        className="pr-10"
                      />
                      {field.value && (
                        <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                          {field.value.length}/500
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creation Method */}
            <div className="col-span-2 space-y-4">
              <div className="space-y-2">
                <Label className="text-lg font-medium">
                  How would you like to create questions?
                </Label>
                <p className="text-sm text-gray-500">
                  Choose your preferred method for creating test questions
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    value: "upload",
                    label: "Upload Document",
                    description: "Upload a file containing questions",
                    icon: "📤",
                    color: "blue",
                    bgColor: "bg-blue-100",
                    textColor: "text-blue-600",
                  },
                  {
                    value: "manual",
                    label: "Create Manually",
                    description: "Type questions one by one",
                    icon: "✏️",
                    color: "green",
                    bgColor: "bg-green-100",
                    textColor: "text-green-600",
                  },
                  {
                    value: "both",
                    label: "Both Methods",
                    description: "Upload and edit questions",
                    icon: "🔄",
                    color: "purple",
                    bgColor: "bg-purple-100",
                    textColor: "text-purple-600",
                  },
                ].map((method) => (
                  <div
                    key={method.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      creationMethod === method.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setCreationMethod(method.value as CreationMethod)
                    }
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`h-10 w-10 flex items-center justify-center rounded-full ${method.bgColor} mb-2`}
                      >
                        <span className={method.textColor}>
                          {method.icon}
                        </span>
                      </div>
                      <span className="font-medium">{method.label}</span>
                      <p className="text-xs text-gray-500 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area */}
            {creationMethod === "upload" && renderFileUpload()}
            {creationMethod === "manual" && renderManualCreation()}
            {creationMethod === "both" && (
              <div className="col-span-2 space-y-4">
                <div className="flex border-b">
                  <TabButton
                    active={activeTab === "upload"}
                    onClick={() => setActiveTab("upload")}
                  >
                    Upload Document
                  </TabButton>
                  <TabButton
                    active={activeTab === "manual"}
                    onClick={() => setActiveTab("manual")}
                  >
                    Create Questions
                  </TabButton>
                </div>
                <div>
                  {activeTab === "upload" && renderFileUpload()}
                  {activeTab === "manual" && renderManualCreation()}
                </div>
              </div>
            )}

            {/* Additional Fields for Multiple Questions */}
            {testType === "multiple" && creationMethod !== "upload" && (
              <>
                <FormField
                  control={form.control}
                  name="questionCount"
                  rules={{ 
                    min: { value: 1, message: "Minimum 1 question" },
                    max: { value: 100, message: "Maximum 100 questions" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 10"
                          min="1"
                          max="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passingScore"
                  rules={{ 
                    min: { value: 0, message: "Minimum 0%" },
                    max: { value: 100, message: "Maximum 100%" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Score (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 70"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Default Question Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single_choice">Single Choice</SelectItem>
                          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                          <SelectItem value="true_false">True/False</SelectItem>
                          <SelectItem value="short_answer">Short Answer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </Form>
      </div>
      
      <div className="flex justify-between pt-6 border-t">
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="rounded-[6px]"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={clearForm}
            className="rounded-[6px] text-gray-600"
            disabled={isLoading}
          >
            Clear All
          </Button>
        </div>
        <Button
          className="rounded-[6px] px-8"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              <span>
                {uploadProgress > 0
                  ? `Creating... ${uploadProgress}%`
                  : "Creating..."}
              </span>
            </div>
          ) : testType === "multiple" ? (
            "Create Test"
          ) : (
            "Proceed"
          )}
        </Button>
      </div>
    </div>
  );
}