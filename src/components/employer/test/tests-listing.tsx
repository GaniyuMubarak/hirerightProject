import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import Icons from "../../ui/icons";
import { useState, useMemo, useRef, useEffect } from "react";

// Types
interface TestItem {
  id: string;
  title: string;
  positionType: string;
  duration: number; // in minutes
  questionCount: number;
  status: "active" | "draft" | "archived";
  createdAt: Date;
}

interface EmployerTestListingProps {
  tests?: TestItem[];
  onEdit?: (test: TestItem) => void;
  onDelete?: (test: TestItem) => void;
  onViewResults?: (test: TestItem) => void;
  onExport?: (test: TestItem) => void;
  onPreview?: (test: TestItem) => void; // Added preview handler
}

export default function EmployerTestListing({
  tests = [],
  onEdit,
  onDelete,
  onViewResults,
  onExport,
  onPreview,
}: EmployerTestListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 items per page
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        const dropdown = dropdownRefs.current[openDropdownId];
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Toggle dropdown for a specific test
  const toggleDropdown = (testId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setOpenDropdownId(openDropdownId === testId ? null : testId);
  };

  // Handle dropdown item click
  const handleDropdownAction = (
    test: TestItem,
    action: Function | undefined,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenDropdownId(null);

    if (action && typeof action === "function") {
      action(test);
    }
  };

  // Filter tests based on search term and status
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.positionType.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        selectedStatus === "all" || test.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tests, searchTerm, selectedStatus]);

  // Calculate paginated tests (5 items per page)
  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTests.slice(startIndex, endIndex);
  }, [filteredTests, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get unique statuses for filter
  const statusOptions = useMemo(() => {
    const statuses = ["all", ...new Set(tests.map((test) => test.status))];
    return statuses;
  }, [tests]);

  // Format duration from minutes to "X mins" or "X hrs Y mins"
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Get badge variant based on status
  const getStatusVariant = (status: TestItem["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "archived":
        return "outline";
      default:
        return "default";
    }
  };

  // Format status for display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setCurrentPage(1);
  };

  // If no tests, show empty state
  if (tests.length === 0) {
    return (
      <div className="border rounded-[12px] p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tests created yet
        </h3>
        <p className="text-gray-500 mb-6">
          Create your first assessment to evaluate candidates
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-[12px] overflow-hidden">
      {/* Header with Search */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Assessment Tests
            </h2>
            <p className="text-gray-500 mt-1">
              Manage and track your candidate assessments
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tests by title or position type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                  type="button">
                  {/* <Icons.x className="h-4 w-4" /> */}
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Icons.filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedStatus !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800">
                {/* <Icons.x className="h-4 w-4 mr-1" /> */}
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredTests.length} of {tests.length} test(s)
            {(searchTerm || selectedStatus !== "all") && (
              <span className="ml-2">
                •{" "}
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  type="button">
                  Clear filters
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredTests.length === 0 ? (
        <div className="p-8 text-center">
          <Icons.search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching tests found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[30%]">Test Details</TableHead>
                  <TableHead className="w-[15%]">Duration</TableHead>
                  <TableHead className="w-[15%]">Questions</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[25%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTests.map((test) => (
                  <TableRow key={test.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-base">
                              {test.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-gray-600">
                                {test.positionType}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                Created{" "}
                                {new Date(test.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-700">
                        {formatDuration(test.duration)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* <Icons.helpCircle className="h-4 w-4 text-gray-400" /> */}
                        <span className="text-gray-700">
                          {test.questionCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(test.status)}>
                        {test.status.charAt(0).toUpperCase() +
                          test.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end items-center gap-2">
                        {/* Results Button */}
                        {onViewResults && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewResults(test);
                            }}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Icons.barChart className="h-4 w-4 mr-2" />
                            Results
                          </Button>
                        )}

                        {/* Edit Button */}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(test);
                            }}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-100">
                            <Icons.edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}

                        {/* Dropdown Menu */}
                        <div
                          className="relative"
                          ref={(el) => {
                            if (el) {
                              dropdownRefs.current[test.id] = el;
                            }
                          }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => toggleDropdown(test.id, e)}
                            aria-label="More actions"
                            type="button">
                            <Icons.more className="h-4 w-4" />
                          </Button>

                          {/* Dropdown Content */}
                          {openDropdownId === test.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                              {/* Preview */}
                              {onPreview && (
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center"
                                  onClick={(e) =>
                                    handleDropdownAction(test, onPreview, e)
                                  }
                                  type="button">
                                  {/* <Icons.eye className="h-4 w-4 mr-2" /> */}
                                  Preview Test
                                </button>
                              )}

                              {/* Settings */}
                              {onEdit && (
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                  onClick={(e) =>
                                    handleDropdownAction(test, onEdit, e)
                                  }
                                  type="button">
                                  <Icons.settings className="h-4 w-4 mr-2" />
                                  Settings
                                </button>
                              )}

                              {/* Export */}
                              {onExport && (
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                  onClick={(e) =>
                                    handleDropdownAction(test, onExport, e)
                                  }
                                  type="button">
                                  <Icons.download className="h-4 w-4 mr-2" />
                                  Export
                                </button>
                              )}

                              {/* Delete */}
                              {onDelete && (
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center"
                                  onClick={(e) =>
                                    handleDropdownAction(test, onDelete, e)
                                  }
                                  type="button">
                                  <Icons.trash className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination - Only show if more than 5 items */}
          {filteredTests.length > itemsPerPage ? (
            <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredTests.length)} of{" "}
                {filteredTests.length} tests
                {searchTerm && (
                  <span className="ml-2">• Filtered by: "{searchTerm}"</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="min-w-[80px]">
                    Previous
                  </Button>

                  {/* Simple page selector for many pages */}
                  {totalPages > 1 && (
                    <select
                      value={currentPage}
                      onChange={(e) => goToPage(Number(e.target.value))}
                      className="border rounded-md px-3 py-1.5 text-sm">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Page {i + 1}
                        </option>
                      ))}
                    </select>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="min-w-[80px]">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Show simple footer if 5 or fewer items
            <div className="p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing all {filteredTests.length} tests
                {searchTerm && (
                  <span className="ml-2">• Filtered by: "{searchTerm}"</span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}