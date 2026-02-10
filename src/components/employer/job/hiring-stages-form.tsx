// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Plus,
//   Trash2,
//   FileQuestion,
//   Clock,
//   Search,
//   Loader,
//   X,
//   Users,
// } from "lucide-react";
// import TestService from "@/services/test-services";
// import { toast } from "sonner";

// interface Test {
//   id: number;
//   title: string;
//   test_type: string;
//   time_limit: number;
//   experience_level: string;
//   description?: string;
//   status: string;
//   question_count?: number;
// }

// interface HiringStage {
//   id: string;
//   name: string;
//   description: string;
//   order: number;
//   tests: number[]; // Test IDs
// }

// export default function HiringStagesForm() {
//   const [stages, setStages] = useState<HiringStage[]>([
//     {
//       id: "stage-1",
//       name: "Initial Screening",
//       description: "Review application and basic assessment",
//       order: 1,
//       tests: [],
//     },
//     {
//       id: "stage-2",
//       name: "Technical Assessment",
//       description: "Evaluate technical skills and knowledge",
//       order: 2,
//       tests: [],
//     },
//     {
//       id: "stage-3",
//       name: "Final Interview",
//       description: "Final round with team leads and HR",
//       order: 3,
//       tests: [],
//     },
//   ]);

//   const [availableTests, setAvailableTests] = useState<Test[]>([]);
//   const [loadingTests, setLoadingTests] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedStageForTest, setSelectedStageForTest] = useState<
//     string | null
//   >(null);

//   useEffect(() => {
//     fetchTests();
//   }, []);

//   const fetchTests = async () => {
//     try {
//       setLoadingTests(true);
//       const response = await TestService.listTests({
//         status: "published",
//         limit: 100,
//       });

//       if (response?.data) {
//         const testsArray = Array.isArray(response.data)
//           ? response.data
//           : response.data.data || [];
//         setAvailableTests(testsArray);
//       }
//     } catch (error) {
//       console.error("Error fetching tests:", error);
//       toast.error("Failed to load tests");
//     } finally {
//       setLoadingTests(false);
//     }
//   };

//   const addStage = () => {
//     const newStage: HiringStage = {
//       id: `stage-${Date.now()}`,
//       name: `Stage ${stages.length + 1}`,
//       description: "",
//       order: stages.length + 1,
//       tests: [],
//     };
//     setStages([...stages, newStage]);
//   };

//   const removeStage = (stageId: string) => {
//     if (stages.length <= 1) {
//       toast.error("At least one hiring stage is required");
//       return;
//     }
//     setStages(stages.filter((stage) => stage.id !== stageId));
//   };

//   const updateStage = (
//     stageId: string,
//     field: keyof HiringStage,
//     value: any,
//   ) => {
//     setStages(
//       stages.map((stage) =>
//         stage.id === stageId ? { ...stage, [field]: value } : stage,
//       ),
//     );
//   };

//   const addTestToStage = (stageId: string, testId: number) => {
//     const stage = stages.find((s) => s.id === stageId);
//     if (stage && !stage.tests.includes(testId)) {
//       updateStage(stageId, "tests", [...stage.tests, testId]);
//     }
//   };

//   const removeTestFromStage = (stageId: string, testId: number) => {
//     const stage = stages.find((s) => s.id === stageId);
//     if (stage) {
//       updateStage(
//         stageId,
//         "tests",
//         stage.tests.filter((id) => id !== testId),
//       );
//     }
//   };

//   const getTestById = (testId: number) => {
//     return availableTests.find((test) => test.id === testId);
//   };

//   const filteredTests = availableTests.filter(
//     (test) =>
//       test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       test.description?.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const getUsedTestIds = () => {
//     const usedIds = new Set<number>();
//     stages.forEach((stage) => {
//       stage.tests.forEach((id) => usedIds.add(id));
//     });
//     return Array.from(usedIds);
//   };

//   const totalAssignedTests = getUsedTestIds().length;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h3 className="text-lg font-semibold">Hiring Stages</h3>
//         <p className="text-gray-600">
//           Define the hiring process stages and assign assessment tests
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="pt-4">
//             <div className="text-2xl font-bold">{stages.length}</div>
//             <div className="text-sm text-gray-600">Total Stages</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-4">
//             <div className="text-2xl font-bold">{totalAssignedTests}</div>
//             <div className="text-sm text-gray-600">Tests Assigned</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-4">
//             <div className="text-2xl font-bold">{availableTests.length}</div>
//             <div className="text-sm text-gray-600">Available Tests</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Hiring Stages List */}
//       <div className="space-y-4">
//         {stages.map((stage, index) => (
//           <Card key={stage.id} className="overflow-hidden">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
//                     {index + 1}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold">Stage {index + 1}</h4>
//                     <p className="text-sm text-gray-500">
//                       Order: {stage.order} • {stage.tests.length} tests
//                     </p>
//                   </div>
//                 </div>
//                 {stages.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeStage(stage.id)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {/* Stage Name */}
//                 <div>
//                   <Label htmlFor={`stage-name-${stage.id}`}>Stage Name</Label>
//                   <Input
//                     id={`stage-name-${stage.id}`}
//                     value={stage.name}
//                     onChange={(e) =>
//                       updateStage(stage.id, "name", e.target.value)
//                     }
//                     placeholder="e.g., Technical Interview"
//                   />
//                 </div>

//                 {/* Stage Description */}
//                 <div>
//                   <Label htmlFor={`stage-desc-${stage.id}`}>
//                     Description (Optional)
//                   </Label>
//                   <Textarea
//                     id={`stage-desc-${stage.id}`}
//                     value={stage.description}
//                     onChange={(e) =>
//                       updateStage(stage.id, "description", e.target.value)
//                     }
//                     placeholder="What happens in this stage?"
//                     className="min-h-[80px]"
//                   />
//                 </div>

//                 {/* Assigned Tests */}
//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <Label className="flex items-center gap-2">
//                       <Users className="h-4 w-4" />
//                       Assigned Tests ({stage.tests.length})
//                     </Label>
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setSelectedStageForTest(stage.id)}>
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Test
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-3xl">
//                         <DialogHeader>
//                           <DialogTitle>
//                             Select Test for {stage.name}
//                           </DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           {/* Search */}
//                           <div className="relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                             <Input
//                               placeholder="Search tests..."
//                               value={searchQuery}
//                               onChange={(e) => setSearchQuery(e.target.value)}
//                               className="pl-10"
//                             />
//                           </div>

//                           {/* Tests List */}
//                           <ScrollArea className="h-[400px] pr-4">
//                             {loadingTests ? (
//                               <div className="flex items-center justify-center py-8">
//                                 <Loader className="h-8 w-8 animate-spin" />
//                               </div>
//                             ) : filteredTests.length > 0 ? (
//                               <div className="space-y-2">
//                                 {filteredTests.map((test) => {
//                                   const isAssigned = stage.tests.includes(
//                                     test.id,
//                                   );
//                                   return (
//                                     <div
//                                       key={test.id}
//                                       className={`p-3 rounded-lg border ${
//                                         isAssigned
//                                           ? "bg-green-50 border-green-200"
//                                           : "hover:bg-gray-50"
//                                       }`}>
//                                       <div className="flex items-center justify-between">
//                                         <div className="flex items-start gap-3">
//                                           <FileQuestion className="h-5 w-5 text-gray-400 mt-1" />
//                                           <div>
//                                             <div className="font-medium">
//                                               {test.title}
//                                             </div>
//                                             <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                                               <span className="flex items-center gap-1">
//                                                 <Clock className="h-3 w-3" />
//                                                 {test.time_limit} min
//                                               </span>
//                                               <span>•</span>
//                                               <Badge
//                                                 variant="outline"
//                                                 className="text-xs">
//                                                 {test.experience_level}
//                                               </Badge>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <Button
//                                           type="button"
//                                           variant={
//                                             isAssigned ? "default" : "outline"
//                                           }
//                                           size="sm"
//                                           onClick={() => {
//                                             if (isAssigned) {
//                                               removeTestFromStage(
//                                                 stage.id,
//                                                 test.id,
//                                               );
//                                             } else {
//                                               addTestToStage(stage.id, test.id);
//                                             }
//                                           }}>
//                                           {isAssigned ? "Remove" : "Assign"}
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             ) : (
//                               <div className="text-center py-8 text-gray-500">
//                                 No tests found
//                               </div>
//                             )}
//                           </ScrollArea>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>

//                   {/* Assigned Tests List */}
//                   {stage.tests.length > 0 ? (
//                     <div className="space-y-2">
//                       {stage.tests.map((testId) => {
//                         const test = getTestById(testId);
//                         if (!test) return null;

//                         return (
//                           <div
//                             key={testId}
//                             className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                             <div className="flex items-center gap-3">
//                               <FileQuestion className="h-4 w-4 text-gray-600" />
//                               <div>
//                                 <div className="font-medium">{test.title}</div>
//                                 <div className="text-sm text-gray-500">
//                                   {test.time_limit} min •{" "}
//                                   {test.experience_level}
//                                 </div>
//                               </div>
//                             </div>
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 removeTestFromStage(stage.id, testId)
//                               }>
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ) : (
//                     <div className="p-4 text-center border-2 border-dashed rounded-lg">
//                       <p className="text-gray-500">
//                         No tests assigned to this stage
//                       </p>
//                       <p className="text-sm text-gray-400 mt-1">
//                         Click "Add Test" to assign assessment tests
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Add Stage Button */}
//       <Button
//         type="button"
//         variant="outline"
//         onClick={addStage}
//         className="w-full border-dashed">
//         <Plus className="h-4 w-4 mr-2" />
//         Add Another Stage
//       </Button>

//       {/* Help Text */}
//       <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <h4 className="font-medium text-blue-800 mb-2">
//           💡 How hiring stages work
//         </h4>
//         <ul className="text-sm text-blue-700 space-y-1">
//           <li>• Candidates progress through stages in order</li>
//           <li>• Tests are assigned to specific stages</li>
//           <li>• You can track candidate progress at each stage</li>
//           <li>• Typical process: Screening → Assessment → Interview</li>
//         </ul>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Trash2,
  FileQuestion,
  Clock,
  Search,
  Loader,
  X,
  Users,
  GripVertical,
} from "lucide-react";
import TestService from "@/services/test-services";
import { toast } from "sonner";

interface Test {
  id: number;
  title: string;
  test_type: string;
  time_limit: number;
  experience_level: string;
  description?: string;
  status: string;
  question_count?: number;
}

interface HiringStage {
  id: string;
  name: string;
  description: string;
  order: number;
  tests: number[];
}

interface HiringStagesFormProps {
  onStagesChange: (stages: HiringStage[]) => void;
  jobId?: number | null;
}

export default function HiringStagesForm({ onStagesChange, jobId }: HiringStagesFormProps) {
  const [stages, setStages] = useState<HiringStage[]>([
    {
      id: "stage-1",
      name: "Application Review",
      description: "Initial screening of applications and resumes",
      order: 1,
      tests: [],
    },
    {
      id: "stage-2",
      name: "Skills Assessment",
      description: "Technical skills and knowledge evaluation",
      order: 2,
      tests: [],
    },
    {
      id: "stage-3",
      name: "Interview",
      description: "Final interview with team leads",
      order: 3,
      tests: [],
    },
  ]);

  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  // Notify parent when stages change
  useEffect(() => {
    onStagesChange(stages);
  }, [stages, onStagesChange]);

  // Fetch available tests
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoadingTests(true);
      const response = await TestService.listTests({
        status: "published",
        limit: 100,
      });

      if (response?.data) {
        const testsArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setAvailableTests(testsArray);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
      toast.error("Failed to load tests");
    } finally {
      setLoadingTests(false);
    }
  };

  const addStage = () => {
    const newStage: HiringStage = {
      id: `stage-${Date.now()}`,
      name: `Stage ${stages.length + 1}`,
      description: "",
      order: stages.length + 1,
      tests: [],
    };
    const updatedStages = [...stages, newStage];
    setStages(updatedStages);
  };

  const removeStage = (stageId: string) => {
    if (stages.length <= 1) {
      toast.error("At least one hiring stage is required");
      return;
    }
    const updatedStages = stages.filter((stage) => stage.id !== stageId);
    // Reorder remaining stages
    const reorderedStages = updatedStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    setStages(reorderedStages);
  };

  const updateStage = (stageId: string, field: keyof HiringStage, value: any) => {
    const updatedStages = stages.map((stage) =>
      stage.id === stageId ? { ...stage, [field]: value } : stage
    );
    
    // Reorder stages if order was changed
    if (field === 'order') {
      updatedStages.sort((a, b) => a.order - b.order);
    }
    
    setStages(updatedStages);
  };

  const addTestToStage = (stageId: string, testId: number) => {
    const stage = stages.find((s) => s.id === stageId);
    if (stage && !stage.tests.includes(testId)) {
      const updatedStages = stages.map((stage) =>
        stage.id === stageId
          ? { ...stage, tests: [...stage.tests, testId] }
          : stage
      );
      setStages(updatedStages);
      toast.success("Test assigned to stage");
    }
  };

  const removeTestFromStage = (stageId: string, testId: number) => {
    const updatedStages = stages.map((stage) =>
      stage.id === stageId
        ? { ...stage, tests: stage.tests.filter((id) => id !== testId) }
        : stage
    );
    setStages(updatedStages);
  };

  const getTestById = (testId: number): Test | undefined => {
    return availableTests.find((test) => test.id === testId);
  };

  const filteredTests = availableTests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.experience_level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUsedTestIds = (): number[] => {
    const usedIds = new Set<number>();
    stages.forEach((stage) => {
      stage.tests.forEach((id) => usedIds.add(id));
    });
    return Array.from(usedIds);
  };

  const totalAssignedTests = getUsedTestIds().length;

//   const getTestTypeLabel = (type: string) => {
//     switch (type) {
//       case 'single': return 'Single Choice';
//       case 'multiple': return 'Multiple Choice';
//       default: return type.charAt(0).toUpperCase() + type.slice(1);
//     }
    //   };
    
    const getTestTypeLabel = (type?: string) => {
      // Handle undefined, null, or empty string
      if (!type) {
        return "Unknown Type";
      }

      // Normalize to lowercase for comparison
      const normalizedType = type.toLowerCase();

      switch (normalizedType) {
        case "single":
        case "single_choice":
          return "Single Choice";
        case "multiple":
        case "multiple_choice":
          return "Multiple Choice";
        case "essay":
        case "text":
          return "Essay";
        case "coding":
        case "code":
          return "Coding";
        case "true_false":
        case "boolean":
          return "True/False";
        default:
          // Capitalize first letter of unknown types
          return type.charAt(0).toUpperCase() + type.slice(1);
      }
    };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Hiring Process Stages</h3>
          <p className="text-gray-600">
            Define hiring stages and assign assessment tests
          </p>
        </div>
        {jobId && (
          <Badge variant="secondary" className="text-sm">
            Job ID: #{jobId}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stages.length}</div>
            <div className="text-sm text-gray-600">Hiring Stages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{totalAssignedTests}</div>
            <div className="text-sm text-gray-600">Tests Assigned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{availableTests.length}</div>
            <div className="text-sm text-gray-600">Available Tests</div>
          </CardContent>
        </Card>
      </div>

      {/* Stages List */}
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card key={stage.id} className="overflow-hidden border border-gray-200">
            <CardContent className="p-6">
              {/* Stage Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{stage.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Stage {index + 1}</span>
                      <span>•</span>
                      <span>{stage.tests.length} test(s)</span>
                    </div>
                  </div>
                </div>
                {stages.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStage(stage.id)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Stage Details */}
              <div className="space-y-4">
                {/* Stage Name */}
                <div>
                  <Label htmlFor={`stage-name-${stage.id}`}>Stage Name *</Label>
                  <Input
                    id={`stage-name-${stage.id}`}
                    value={stage.name}
                    onChange={(e) => updateStage(stage.id, "name", e.target.value)}
                    placeholder="e.g., Technical Screening, HR Interview"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Stage Description */}
                <div>
                  <Label htmlFor={`stage-desc-${stage.id}`}>Description</Label>
                  <Textarea
                    id={`stage-desc-${stage.id}`}
                    value={stage.description}
                    onChange={(e) =>
                      updateStage(stage.id, "description", e.target.value)
                    }
                    placeholder="Describe what happens in this stage..."
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                {/* Stage Order */}
                <div>
                  <Label>Stage Order</Label>
                  <Select
                    value={stage.order.toString()}
                    onValueChange={(value) => updateStage(stage.id, "order", parseInt(value))}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((_, idx) => (
                        <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                          Position {idx + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Assigned Tests Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Assigned Tests
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Add assessment tests for this stage
                      </p>
                    </div>
                    <Dialog open={activeDialog === stage.id} onOpenChange={(open) => {
                      setActiveDialog(open ? stage.id : null);
                      setSelectedStageId(stage.id);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStageId(stage.id);
                            setActiveDialog(stage.id);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Select Test for {stage.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Search */}
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search tests by title, description, or level..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          {/* Refresh Button */}
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Showing {filteredTests.length} of {availableTests.length} tests
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={fetchTests}
                              disabled={loadingTests}
                            >
                              {loadingTests ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                "Refresh"
                              )}
                            </Button>
                          </div>

                          {/* Tests List */}
                          <ScrollArea className="h-[400px] pr-4">
                            {loadingTests ? (
                              <div className="flex items-center justify-center py-8">
                                <Loader className="h-8 w-8 animate-spin" />
                                <span className="ml-3">Loading tests...</span>
                              </div>
                            ) : filteredTests.length > 0 ? (
                              <div className="space-y-2">
                                {filteredTests.map((test) => {
                                  const isAssigned = stage.tests.includes(test.id);
                                  return (
                                    <div
                                      key={test.id}
                                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                        isAssigned
                                          ? "bg-green-50 border-green-200"
                                          : "hover:bg-gray-50 border-gray-200"
                                      }`}
                                      onClick={() => {
                                        if (isAssigned) {
                                          removeTestFromStage(stage.id, test.id);
                                        } else {
                                          addTestToStage(stage.id, test.id);
                                        }
                                      }}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                          <div className={`p-2 rounded ${
                                            isAssigned 
                                              ? "bg-green-100 text-green-600" 
                                              : "bg-gray-100 text-gray-600"
                                          }`}>
                                            <FileQuestion className="h-4 w-4" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                              <div>
                                                <h5 className="font-medium text-gray-900">
                                                  {test.title}
                                                </h5>
                                                {test.description && (
                                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {test.description}
                                                  </p>
                                                )}
                                              </div>
                                              <Badge variant={isAssigned ? "default" : "outline"}>
                                                {isAssigned ? "Assigned" : "Available"}
                                              </Badge>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                                              <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                {test.time_limit} min
                                              </span>
                                              <span className="text-gray-300">•</span>
                                              <Badge variant="secondary" className="text-xs">
                                                {getTestTypeLabel(test.test_type)}
                                              </Badge>
                                              <span className="text-gray-300">•</span>
                                              <span className="text-sm text-gray-500 capitalize">
                                                {test.experience_level}
                                              </span>
                                              {test.question_count && (
                                                <>
                                                  <span className="text-gray-300">•</span>
                                                  <span className="text-sm text-gray-500">
                                                    {test.question_count} questions
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <FileQuestion className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">
                                  {searchQuery ? "No matching tests found" : "No tests available"}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                  {searchQuery 
                                    ? "Try a different search term" 
                                    : "Create tests to make them available for assignment"
                                  }
                                </p>
                                {!searchQuery && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-3"
                                    onClick={() => window.open('/employer/tests/create', '_blank')}
                                  >
                                    Create New Test
                                  </Button>
                                )}
                              </div>
                            )}
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Assigned Tests List */}
                  {stage.tests.length > 0 ? (
                    <div className="space-y-2">
                      {stage.tests.map((testId) => {
                        const test = getTestById(testId);
                        if (!test) return null;

                        return (
                          <div
                            key={testId}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border group hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded bg-primary/10">
                                <FileQuestion className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{test.title}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <span>{test.time_limit} min</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {getTestTypeLabel(test.test_type)}
                                  </Badge>
                                  <span>•</span>
                                  <span className="capitalize">{test.experience_level}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTestFromStage(stage.id, testId)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center border-2 border-dashed rounded-lg bg-gray-50/50">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                        <FileQuestion className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">No tests assigned</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Add tests to assess candidates in this stage
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Stage Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addStage}
        className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Stage
      </Button>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Hiring Stages</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-medium text-blue-700 mb-1">Stage Structure</div>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Keep 3-5 stages for optimal candidate experience</li>
              <li>• Start with screening tests, then progress to interviews</li>
              <li>• Be clear about what happens in each stage</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-blue-700 mb-1">Test Selection</div>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Use different tests for different skill assessments</li>
              <li>• Consider the total time required across all stages</li>
              <li>• Make sure tests are relevant to the role</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}