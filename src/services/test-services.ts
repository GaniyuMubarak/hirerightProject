import requests from "@/services/https-services";
import { toast } from "sonner";
export interface CreateTestData {
  title: string; // Changed from 'name'
  time_limit: number; // Changed from 'duration' (in minutes)
  experience_level: string;
  description?: string;
  test_type: "single" | "multiple";
  creation_method: "upload" | "manual" | "both";
  question_count?: number;
  passing_score?: number;
  question_type?: string;
  status?: "draft" | "published" | "archived";
  submission_type: string; 
  visibility_type: string; 
}

export interface QuestionData {
  question_text: string;
  question_type: "single_choice" | "multiple_choice" | "true_false" | "short_answer";
  points?: number;
  order?: number;
  settings?: any;
}

export interface OptionData {
  option_text: string;
  text?: string; // Alternative field name
  is_correct: boolean;
  points?: number;
  order?: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

class TestService {
  // Create a new test with correct field names
  static async createTest(data: CreateTestData): Promise<any> {
    try {
      // Format the data to match API expectations
      const formattedData = {
        title: data.title,
        time_limit: data.time_limit,
        experience_level: data.experience_level,
        description: data.description || "",
        test_type: data.test_type,
        creation_method: data.creation_method,
        question_count: data.question_count || 0,
        passing_score: data.passing_score || 0,
        question_type: data.question_type || "single_choice",
        status: data.status || "draft",
        submission_type: data.submission_type || "online", // Default value
        visibility_type: data.visibility_type || "view_before_start", // Default value
      };

      console.log("[TestService] Creating test with data:", formattedData);

      const response = await requests.post("/employers/tests", formattedData);

      if (response.status === "success") {
        toast.success(response.message || "Test created successfully");
        return response.data;
      } else {
        // Handle validation errors
        if (response.errors) {
          const errorMessages = Object.values(response.errors)
            .flat()
            .join(", ");
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(response.message || "Failed to create test");
      }
    } catch (error: any) {
      console.error("[TestService] Error creating test:", error);

      // Extract error message from response
      let errorMessage = "Failed to create test";
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
      throw error;
    }
  }

  // Add question to test
  static async addQuestion(testId: number, data: QuestionData): Promise<any> {
    try {
      console.log(`[TestService] Adding question for test ${testId}`, data);

      // Format data to match backend
      const formattedData: any = {
        question_text: data.question_text,
        question_type: data.question_type,
        order: data.order || 1,
      };

      // Add points if defined
      if (data.points !== undefined) {
        formattedData.points = Number(data.points);
      }

      // Add settings
      formattedData.settings = data.settings || null;

      console.log(`[TestService] Formatted question data:`, formattedData);

      const response = await requests.post(
        `/employers/tests/${testId}/questions`,
        formattedData
      );

      console.log(`[TestService] Add question response:`, response);

      if (response.status === "success") {
        toast.success(response.message || "Question added successfully");
        return response.data;
      } else {
        throw new Error(response.message || "Failed to add question");
      }
    } catch (error: any) {
      console.error("[TestService] Error adding question:", error);

      if (error.response) {
        console.error(
          "[TestService] Error response data:",
          error.response.data
        );
        console.error(
          "[TestService] Error response status:",
          error.response.status
        );
      }

      throw error;
    }
  }

  // Add options to a question
  static async addOptions(
    testId: number,
    questionId: number,
    options: OptionData[]
  ): Promise<any> {
    try {
      console.log(
        `[TestService] Adding options for test ${testId}, question ${questionId}`,
        options
      );

      // Format options to match backend expectations
      const formattedOptions = options.map((opt, index) => ({
        option_text: opt.option_text || opt.text, // Use correct field name
        is_correct: Boolean(opt.is_correct),
        points: opt.points !== undefined ? Number(opt.points) : 0,
        order: opt.order !== undefined ? opt.order : index,
      }));

      console.log(`[TestService] Formatted options:`, formattedOptions);

      const response = await requests.post(
        `/employers/tests/${testId}/questions/${questionId}/options`,
        { options: formattedOptions } //  Wrap in { options: ... }
      );

      console.log(`[TestService] Add options response:`, response);

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to add options");
      }
    } catch (error: any) {
      console.error("[TestService] Error adding options:", error);

      if (error.response) {
        console.error(
          "[TestService] Error response data:",
          error.response.data
        );
        console.error(
          "[TestService] Error response status:",
          error.response.status
        );
      }

      throw error;
    }
  }

  // Upload file for test
  static async uploadFile(testId: number, file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("test_id", testId.toString());

      const response = await requests.post(
        "/employers/tests/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === "success") {
        toast.success("File uploaded successfully");
        return response.data;
      } else {
        throw new Error(response.message || "Failed to upload file");
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload file";
      toast.error(errorMessage);
      throw error;
    }
  }

  // Get test by ID
  static async getTest(testId: number): Promise<any> {
    try {
      const response = await requests.get(`/employers/tests/${testId}`);

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to get test");
      }
    } catch (error: any) {
      console.error("Error getting test:", error);
      throw error;
    }
  }

  // Update test
  static async updateTest(
    testId: number,
    data: Partial<CreateTestData>
  ): Promise<any> {
    try {
      const response = await requests.put(`/employers/tests/${testId}`, data);

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to update test");
      }
    } catch (error: any) {
      console.error("Error updating test:", error);
      throw error;
    }
  }

  // Delete test
  static async deleteTest(testId: number): Promise<void> {
    try {
      const response = await requests.delete(`/employers/tests/${testId}`);

      if (response.status !== "success") {
        throw new Error(response.message || "Failed to delete test");
      }
    } catch (error: any) {
      console.error("Error deleting test:", error);
      throw error;
    }
  }

  // List tests with pagination
//   static async listTests(params?: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     search?: string;
//   }): Promise<any> {
//     try {
//       const response = await requests.get("/employers/tests", params);

//       if (response.status === "success") {
//         return response.data;
//       } else {
//         throw new Error(response.message || "Failed to list tests");
//       }
//     } catch (error: any) {
//       console.error("Error listing tests:", error);
//       throw error;
//     }
    //   }
    

static async listTests(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<any> {
  try {
    console.log("[TestService] Fetching tests with params:", params);
    
    const response = await requests.get("/employers/tests", params);
    
    console.log("[TestService] List tests response:", response);
    console.log("[TestService] Tests data:", response.data);
    console.log("[TestService] Tests array:", response.data?.data);
    
    if (response.status === "success") {
      // Return the pagination object which contains the data array
      return response.data;
    } else {
      throw new Error(response.message || "Failed to list tests");
    }
  } catch (error: any) {
    console.error("[TestService] Error listing tests:", error);
    throw error;
  }
}

  // Get questions for a test
  static async getQuestions(testId: number): Promise<any> {
    try {
      const response = await requests.get(
        `/employers/tests/${testId}/questions`
      );

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to get questions");
      }
    } catch (error: any) {
      console.error("Error getting questions:", error);
      throw error;
    }
  }

  // Publish test
  static async publishTest(testId: number): Promise<any> {
    try {
      const response = await requests.post(
        `/employers/tests/${testId}/publish`
      );

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to publish test");
      }
    } catch (error: any) {
      console.error("Error publishing test:", error);
      throw error;
    }
  }

  // Archive test
  static async archiveTest(testId: number): Promise<any> {
    try {
      const response = await requests.post(
        `/employers/tests/${testId}/archive`
      );

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to archive test");
      }
    } catch (error: any) {
      console.error("Error archiving test:", error);
      throw error;
    }
  }

  // Get test statistics
  static async getTestStats(testId: number): Promise<any> {
    try {
      const response = await requests.get(`/employers/tests/${testId}/stats`);

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to get test stats");
      }
    } catch (error: any) {
      console.error("Error getting test stats:", error);
      throw error;
    }
  }

  // Bulk create questions (for multiple questions at once)
  static async bulkCreateQuestions(
    testId: number,
    questions: QuestionData[]
  ): Promise<any> {
    try {
      const response = await requests.post(
        `/employers/tests/${testId}/questions/bulk`,
        { questions }
      );

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to bulk create questions");
      }
    } catch (error: any) {
      console.error("Error bulk creating questions:", error);
      throw error;
    }
  }
}

export default TestService;