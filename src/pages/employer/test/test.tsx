// // import { useEffect, useState } from "react";
// // import EmployerTestListing from "@/components/employer/test/tests-listing";
// // import { buttonVariants } from "@/components/ui/button";
// // import { cn } from "@/lib/utils";
// // import { Link } from "react-router";
// // import TestService from "@/services/test-services";

// // export default function EmployerTests() {
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchTests = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Fetch tests from API
// //         const response = await TestService.listTests();
        
// //         console.log("API Response:", response);
// //         console.log("Tests Data:", response.data);
        
// //         // Transform API data to component format
// //         const transformedTests = (response.data || []).map((test: any) => ({
// //           id: test.id.toString(),
// //           title: test.title,
// //           positionType: test.experience_level || "General",
// //           duration: test.time_limit,
// //           questionCount: test.questions_count || 0,
// //           status: test.is_active ? "active" : "draft",
// //           createdAt: new Date(test.created_at),
// //         }));
        
// //         console.log("Transformed Tests:", transformedTests);
        
// //         setTests(transformedTests);
// //       } catch (error) {
// //         console.error("Error fetching tests:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTests();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 pt-8">
// //         <div className="text-center py-12">Loading tests...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
// //       <header className="space-y-1 border-b pb-5 flex justify-between">
// //         <h1 className="text-2xl font-semibold">Manage your tests</h1>
// //         <Link
// //           to={"/employer/tests/create"}
// //           className={cn(buttonVariants(), "rounded-[6px]")}
// //         >
// //           Create a Test
// //         </Link>
// //       </header>
      
// //       {/* Pass the transformed tests here */}
// //       <EmployerTestListing 
// //         tests={tests}
// //         onEdit={(test) => console.log("Edit:", test)}
// //         onDelete={(test) => console.log("Delete:", test)}
// //         onViewResults={(test) => console.log("View:", test)}
// //       />
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import EmployerTestListing from "@/components/employer/test/tests-listing";
// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router";
// import TestService from "@/services/test-services";
// import { toast } from "sonner";

// export default function EmployerTests() {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTests();
//   }, []);

//   const fetchTests = async () => {
//     try {
//       setLoading(true);
//       const response = await TestService.listTests();

//       console.log("API Response:", response);
//       console.log("Tests Data:", response.data);

//       // Transform API data to component format
//       const transformedTests = (response.data || []).map((test: any) => ({
//         id: test.id.toString(),
//         title: test.title,
//         positionType: test.experience_level || "General",
//         duration: test.time_limit,
//         questionCount: test.questions_count || 0,
//         status: test.is_active ? "active" : "draft",
//         createdAt: new Date(test.created_at),
//       }));

//       console.log("Transformed Tests:", transformedTests);

//       setTests(transformedTests);
//     } catch (error) {
//       console.error("Error fetching tests:", error);
//       toast.error("Failed to load tests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handler functions
//   const handleEdit = (test: any) => {
//     console.log("Edit test:", test);
//     navigate(`/employer/tests/edit/${test.id}`);
//     // Or if you want to open in modal:
//     // setEditingTest(test);
//     // setShowEditModal(true);
//   };

//   // const handleDelete = async (test: any) => {
//   //   if (!confirm(`Are you sure you want to delete "${test.title}"?`)) {
//   //     return;
//   //   }

//   //   try {
//   //     await TestService.deleteTest(parseInt(test.id));
//   //     toast.success("Test deleted successfully");

//   //     // Refresh the list
//   //     fetchTests();
//   //   } catch (error) {
//   //     console.error("Error deleting test:", error);
//   //     toast.error("Failed to delete test");
//   //   }
//   // };


//   const handleDelete = async (test: any) => {
//     // Create a custom confirmation toast
//     const toastId = toast.custom(
//       (t) => (
//         <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full max-w-sm">
//           <div className="flex flex-col gap-3">
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5">
//                 <div className="h-4 w-4 rounded-full bg-red-100 flex items-center justify-center">
//                   <div className="h-2 w-2 rounded-full bg-red-600"></div>
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900">Delete Test</h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Are you sure you want to delete "{test.title}"? This action
//                   cannot be undone.
//                 </p>
//               </div>
//             </div>
//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 onClick={() => toast.dismiss(t)}
//                 className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors">
//                 Cancel
//               </button>
//               <button
//                 onClick={async () => {
//                   toast.dismiss(t);
//                   try {
//                     await TestService.deleteTest(parseInt(test.id));
//                     toast.success(`Test "${test.title}" deleted successfully`);
//                     fetchTests();
//                   } catch (error) {
//                     console.error("Error deleting test:", error);
//                     toast.error("Failed to delete test");
//                   }
//                 }}
//                 className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         duration: Infinity, // Don't auto-dismiss
//         position: "top-center",
//       }
//     );
//   };

//   const handleViewResults = (test: any) => {
//     console.log("View results for:", test);
//     navigate(`/employer/tests/${test.id}/results`);
//     // Or open results modal
//   };

//   // const handleDuplicate = async (test: any) => {
//   //   try {
//   //     // You'll need to implement this in TestService
//   //     // const duplicated = await TestService.duplicateTest(parseInt(test.id));
//   //     toast.success("Test duplicated successfully");
//   //     fetchTests();
//   //   } catch (error) {
//   //     console.error("Error duplicating test:", error);
//   //     toast.error("Failed to duplicate test");
//   //   }
//   // };

//   const handleExport = async (test: any) => {
//     try {
//       // Export test data as JSON or PDF
//       const testData = await TestService.getTest(parseInt(test.id));

//       // Download as JSON
//       const blob = new Blob([JSON.stringify(testData, null, 2)], {
//         type: "application/json",
//       });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${test.title.replace(/\s+/g, "-")}.json`;
//       a.click();
//       URL.revokeObjectURL(url);

//       toast.success("Test exported successfully");
//     } catch (error) {
//       console.error("Error exporting test:", error);
//       toast.error("Failed to export test");
//     }
//   };

//   // if (loading) {
//   //   return (
//   //     <div className="max-w-7xl mx-auto px-4 pt-8">
//   //       <div className="text-center py-12">Loading tests...</div>
//   //     </div>
//   //   );
//   // }


//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8">
//         <div className="text-center py-12 flex flex-col items-center gap-4">
//           {/* Spinner */}
//           <div className="relative">
//             <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
//             <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent absolute top-0 left-0 animate-spin"></div>
//           </div>
//           <p className="text-gray-600">Loading tests...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
//       <header className="space-y-1 border-b pb-5 flex justify-between">
//         <h1 className="text-2xl font-semibold">Manage your tests</h1>
//         <Link
//           to={"/employer/tests/create"}
//           className={cn(buttonVariants(), "rounded-[6px]")}>
//           Create a Test
//         </Link>
//       </header>

//       <EmployerTestListing
//         tests={tests}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onViewResults={handleViewResults}
//         // onDuplicate={handleDuplicate}
//         onExport={handleExport}
//       />
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmployerTestListing from "@/components/employer/test/tests-listing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import TestService from "@/services/test-services";
import { toast } from "sonner";

export default function EmployerTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await TestService.listTests();

      console.log("API Response:", response);
      console.log("Tests Data:", response.data);

      // Transform API data to component format
      const transformedTests = (response.data || []).map((test: any) => ({
        id: test.id.toString(),
        title: test.title,
        positionType: test.experience_level || "General",
        duration: test.time_limit,
        questionCount: test.questions_count || 0,
        status: test.is_active ? "active" : "draft",
        createdAt: new Date(test.created_at),
      }));

      console.log("Transformed Tests:", transformedTests);

      setTests(transformedTests);
    } catch (error) {
      console.error("Error fetching tests:", error);
      toast.error("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const handleEdit = (test: any) => {
    console.log("Edit test:", test);
    // Temporarily comment out until route exists
    // navigate(`/employer/tests/edit/${test.id}`);
    toast.info(`Editing "${test.title}" - Feature coming soon!`);
  };

  const handleDelete = async (test: any) => {
    // Create a custom confirmation toast
    const toastId = toast.custom(
      (t) => (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full max-w-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="h-4 w-4 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Delete Test</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete "{test.title}"? This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => toast.dismiss(t)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors">
                Cancel
              </button>
              <button
                onClick={async () => {
                  toast.dismiss(t);
                  try {
                    await TestService.deleteTest(parseInt(test.id));
                    toast.success(`Test "${test.title}" deleted successfully`);
                    fetchTests();
                  } catch (error) {
                    console.error("Error deleting test:", error);
                    toast.error("Failed to delete test");
                  }
                }}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Don't auto-dismiss
        position: "top-center",
      }
    );
  };

  const handleViewResults = (test: any) => {
    console.log("View results for:", test);
    // Temporarily comment out until route exists
    // navigate(`/employer/tests/${test.id}/results`);
    toast.info(`Viewing results for "${test.title}" - Feature coming soon!`);
  };

  const handlePreview = (test: any) => {
    console.log("Preview test:", test);
    toast.info(`Previewing "${test.title}" - Feature coming soon!`);
  };

  const handleExport = async (test: any) => {
    try {
      // Export test data as JSON or PDF
      const testData = await TestService.getTest(parseInt(test.id));

      // Download as JSON
      const blob = new Blob([JSON.stringify(testData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${test.title.replace(/\s+/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Test exported successfully");
    } catch (error) {
      console.error("Error exporting test:", error);
      toast.error("Failed to export test");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="text-center py-12 flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
            <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      <header className="space-y-1 border-b pb-5 flex justify-between">
        <h1 className="text-2xl font-semibold">Manage your tests</h1>
        <Link
          to={"/employer/tests/create"}
          className={cn(buttonVariants(), "rounded-[6px]")}>
          Create a Test
        </Link>
      </header>

      <EmployerTestListing
        tests={tests}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewResults={handleViewResults}
        onExport={handleExport}
        onPreview={handlePreview} // ADD THIS LINE - REQUIRED
      />
    </div>
  );
}