


// import requests from "./https-services";

// const JobServices = {
//   getAllJobs: async () => {
//     return requests.get("/employers/jobs");
//   },

//   getJob: async (id: string) => {
//     return requests.get(`/employers/jobs/${id}`);
//   },

//   createJob: async (body: any) => {
//     try {
//       console.log("📤 JobServices.createJob called with:", body);

//       const response = await requests.post("/employers/jobs", body);

//       console.log("📥 JobServices.createJob response:", response);

//       // Check if response has the expected structure
//       if (!response || !response.data || !response.data.id) {
//         console.error("❌ Invalid response structure:", response);
//         throw new Error("Failed to create job - invalid response");
//       }

//       return response; // Return full response (not response.data)
//     } catch (error: any) {
//       console.error("❌ JobServices.createJob error:", error);

//       // Re-throw with proper structure
//       throw {
//         response: {
//           status: error?.response?.status || 500,
//           data: error?.response?.data || {
//             message: error.message || "Failed to create job",
//           },
//         },
//       };
//     }
//   },

//   updateJob: async (id: string, body: any) => {
//     return requests.put(`/employers/jobs/${id}`, body);
//   },

//   deleteJob: async (id: string) => {
//     return requests.delete(`/employers/jobs/${id}`);
//   },

//   // Test assignment methods
//   assignTestToJob: async (jobId: number, testId: number) => {
//     return requests.put(`/employers/jobs/${jobId}/test`, {
//       test_id: testId,
//     });
//   },

//   removeTestFromJob: async (jobId: number) => {
//     return requests.delete(`/employers/jobs/${jobId}/test`);
//   },

//   // Bulk assign tests

//   // assignMultipleTestsToJob: async (jobId: number, testIds: number[]) => {
//   //   const results = [];
//   //   for (const testId of testIds) {
//   //     try {
//   //       const result = await JobServices.assignTestToJob(jobId, testId);
//   //       results.push({ testId, success: true, data: result });
//   //     } catch (error) {
//   //       results.push({ testId, success: false, error });
//   //     }
//   //   }
//   //   return results;
//   // },

//   assignMultipleTestsToJob: async (
//     jobId: number,
//     payload: {
//       stages: Array<{
//         name: string;
//         description: string;
//         order: number;
//         tests: number[];
//       }>;
//     },
//   ) => {
//     console.log(`📤 Assigning tests to job ${jobId}:`, payload);

//     const response = await requests.put(
//       `/employers/jobs/${jobId}/tests/assign-multiple`,
//       payload,
//     );

//     console.log(`📥 Assign tests response:`, response);
//     return response;
//   },

//   // Get job applications
//   getJobApplications: async (jobId: string) => {
//     return requests.get(`/employers/jobs/${jobId}/applications`);
//   },

//   // Get job candidates
//   getJobCandidates: async (jobId: string) => {
//     return requests.get(`/employers/jobs/${jobId}/candidates`);
//   },
// };

// export default JobServices;





import requests from "./https-services";

interface HiringStagePayload {
  name: string;
  description: string;
  order: number;
  tests: number[];
}

interface AssignTestsPayload {
  stages: HiringStagePayload[];
}

const JobServices = {
  getAllJobs: async () => {
    return requests.get("/employers/jobs");
  },

  getJob: async (id: string) => {
    return requests.get(`/employers/jobs/${id}`);
  },

  createJob: async (body: any) => {
    try {
      console.log("📤 JobServices.createJob called with:", body);

      const response = await requests.post("/employers/jobs", body);

      console.log("📥 JobServices.createJob response:", response);

      if (!response || !response.data || !response.data.id) {
        console.error("❌ Invalid response structure:", response);
        throw new Error("Failed to create job - invalid response");
      }

      return response;
    } catch (error: any) {
      console.error("❌ JobServices.createJob error:", error);

      // Enhanced error logging
      if (error.response) {
        console.error("❌ Response status:", error.response.status);
        console.error("❌ Response data:", error.response.data);
        console.error("❌ Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("❌ No response received:", error.request);
      } else {
        console.error("❌ Request setup error:", error.message);
      }

      throw error;
    }
  },

  updateJob: async (id: string, body: any) => {
    return requests.put(`/employers/jobs/${id}`, body);
  },

  deleteJob: async (id: string) => {
    return requests.delete(`/employers/jobs/${id}`);
  },

  // Test assignment methods
  assignTestToJob: async (jobId: number, testId: number) => {
    console.log(`📤 Assigning single test ${testId} to job ${jobId}`);

    return requests.put(`/employers/jobs/${jobId}/test`, {
      test_id: testId,
    });
  },

  removeTestFromJob: async (jobId: number) => {
    return requests.delete(`/employers/jobs/${jobId}/test`);
  },

  assignMultipleTestsToJob: async (
    jobId: number,
    payload: AssignTestsPayload,
  ) => {
    try {
      console.log(`📤 Assigning tests to job ${jobId}:`, payload);

      // Validate payload
      if (!payload.stages || !Array.isArray(payload.stages)) {
        throw new Error("Invalid payload: 'stages' must be an array");
      }

      // Validate each stage
      payload.stages.forEach((stage, index) => {
        if (!stage.name || !stage.name.trim()) {
          throw new Error(`Stage ${index + 1} must have a name`);
        }
        if (!Array.isArray(stage.tests)) {
          throw new Error(`Stage ${index + 1}: 'tests' must be an array`);
        }
        // Validate that tests are numbers
        stage.tests.forEach((testId, testIndex) => {
          if (!Number.isInteger(testId)) {
            throw new Error(
              `Stage ${index + 1}, Test ${testIndex + 1}: must be an integer`,
            );
          }
        });
      });

      // Use PUT method to match backend route
      const response = await requests.put(
        `/employers/jobs/${jobId}/tests/assign-multiple`,
        payload,
      );

      console.log(`📥 Assign tests response:`, response);

      if (!response) {
        throw new Error("No response received from server");
      }

      return response;
    } catch (error: any) {
      console.error(`❌ Error in assignMultipleTestsToJob:`, error);

      if (error.response) {
        console.error("❌ API Response status:", error.response.status);
        console.error("❌ API Response data:", error.response.data);
      }

      throw error;
    }
  },





  // Alternative: Assign single test to job (if needed separately)
  // assignSingleTestToJob: async (jobId: number, testId: number) => {
  //   console.log(`📤 Assigning single test ${testId} to job ${jobId}`);
  //   return requests.post(`/employers/jobs/${jobId}/assign-test`, {
  //     testId: testId,
  //   });
  // },

  // Get job applications
  getJobApplications: async (jobId: string) => {
    return requests.get(`/employers/jobs/${jobId}/applications`);
  },

  // Get job candidates
  getJobCandidates: async (jobId: string) => {
    return requests.get(`/employers/jobs/${jobId}/candidates`);
  },
};

export default JobServices;