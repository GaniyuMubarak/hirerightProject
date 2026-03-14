import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { AlertCircle, Loader, Save } from "lucide-react";
import { toast } from "sonner";

import JobTitleForm from "@/components/employer/job/job-title";
import SalaryForm from "@/components/employer/job/salary-form";
import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
import LocationForm from "@/components/employer/job/location-form";
import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
import JobDescriptionForm from "@/components/employer/job/job-description";
import JobVisibilityForm from "@/components/employer/job/job-visibility-form";

import JobServices from "@/services/job-services";
import useEditJobForm from "@/hooks/forms/use-edit-job-form";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Job {
  id: string;
  title: string;
  employment_type: "part_time" | "full_time";
  salary_currency: string;
  salary_min: number;
  salary_max: number;
  positions_available: number;
  status: string;
}

interface EmployerJobListingProps {
  job?: { data: { data: Job[] } };
  onJobUpdated?: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatSalary = (min: number, max: number, currency: string) => {
  try {
    const fmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${fmt.format(min)} - ${fmt.format(max)}`;
  } catch {
    return `${currency} ${Number(min).toLocaleString()} - ${Number(max).toLocaleString()}`;
  }
};

const getEmploymentTypeLabel = (type: string) =>
  type === "part_time" ? "Part Time" : "Full Time";

// ── Sheet skeleton while fetching job ─────────────────────────────────────────

function EditFormSkeleton() {
  return (
    <div className="space-y-8 py-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function EmployerJobListing({
  job,
  onJobUpdated,
}: EmployerJobListingProps) {
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    form,
    editJob,
    isLoading,
    isSaving,
    isOpen,
    openEdit,
    closeEdit,
    onSubmit,
  } = useEditJobForm({ onSuccess: onJobUpdated });

  const jobList = job?.data?.data || [];

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleDeleteConfirm = async () => {
    if (!deleteJobId) return;
    setIsDeleting(true);
    try {
      await JobServices.deleteJob(deleteJobId);
      toast.success("Job deleted successfully");
      setDeleteJobId(null);
      onJobUpdated?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete job");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Shared dropdown ─────────────────────────────────────────────────────────

  const JobActions = ({ j }: { j: Job }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Icons.more className="min-h-5 min-w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => openEdit(j)}>
          <Icons.edit className="h-4 w-4" />
          Edit Job
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          onClick={() => setDeleteJobId(j.id)}>
          <Icons.trash className="h-4 w-4" />
          Delete Job
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // ── Empty state ─────────────────────────────────────────────────────────────

  if (jobList.length === 0) {
    return (
      <div className="border rounded-[12px] p-6 lg:p-8">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-medium">My Jobs</h1>
        </header>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.briefcase className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first job posting
          </p>
          <Button asChild>
            <Link to="/employer/jobs/post">Post a Job</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  return (
    <>
      <div className="border rounded-[12px] p-4 lg:p-6 space-y-4">
        <header className="border-b pb-2.5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">My Jobs</h1>
            <Button asChild size="sm">
              <Link to="/employer/jobs/post">Post New Job</Link>
            </Button>
          </div>
        </header>

        {/* Desktop table */}
        <div className="border-b max-lg:hidden">
          <Table>
            <TableHeader className="bg-[#F9FAFB]">
              <TableRow>
                <TableHead className="w-[22%]">Job/s</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobList.map((j) => (
                <TableRow key={j.id}>
                  <TableCell>
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-[#020C10] text-lg font-normal tracking-[-1px] leading-none">
                        {j.title}
                      </span>
                      <span className="text-[#475467] text-sm">
                        {getEmploymentTypeLabel(j.employment_type)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="whitespace-nowrap text-sm">
                      {formatSalary(
                        j.salary_min,
                        j.salary_max,
                        j.salary_currency,
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.peopleSm />
                      {j.positions_available} Positions
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{j.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="secondary" size="sm" asChild>
                        <Link to={`/employer/jobs/${j.id}/applications`}>
                          View Applications
                        </Link>
                      </Button>
                      <JobActions j={j} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          {jobList.map((j) => (
            <div key={j.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base tracking-[-0.5px]">
                    {j.title}
                  </h3>
                  <span className="text-[#475467] text-sm">
                    {getEmploymentTypeLabel(j.employment_type)}
                  </span>
                </div>
                <Badge>{j.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Salary</p>
                  <p className="font-medium">
                    {formatSalary(
                      j.salary_min,
                      j.salary_max,
                      j.salary_currency,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">
                    Positions
                  </p>
                  <p className="font-medium">{j.positions_available}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="flex-1">
                  <Link to={`/employer/jobs/${j.id}/applications`}>
                    View Applications
                  </Link>
                </Button>
                <JobActions j={j} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Edit Sheet ──────────────────────────────────────────────────────── */}
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeEdit()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl flex flex-col p-0 gap-0">
          {/* Fixed header */}
          {/* <SheetHeader className="px-6 py-4 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle>Edit Job</SheetTitle>
                {editJob && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {editJob.title}
                  </p>
                )}
              </div>
              {form.formState.isDirty && !isLoading && (
                <div className="flex items-center gap-1.5 text-xs text-yellow-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  Unsaved changes
                </div>
              )}
            </div>
          </SheetHeader> */}

          <SheetHeader className="px-6 py-4 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle>Edit Job</SheetTitle>
                <SheetDescription className="sr-only">
                  Edit job listing details and settings
                </SheetDescription>
                {editJob && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {editJob.title}
                  </p>
                )}
              </div>
              {form.formState.isDirty && !isLoading && (
                <div className="flex items-center gap-1.5 text-xs text-yellow-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  Unsaved changes
                </div>
              )}
            </div>
          </SheetHeader>

          {/* Scrollable form body */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="px-6">
                <EditFormSkeleton />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={onSubmit} id="edit-job-form">
                  <div className="px-6 py-6 space-y-8">
                    {/* Validation error summary */}
                    {Object.keys(form.formState.errors).length > 0 && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">
                            Please fix the following errors:
                          </span>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                          {Object.entries(form.formState.errors).map(
                            ([field, error]) => (
                              <li key={field}>
                                <button
                                  type="button"
                                  className="hover:underline focus:outline-none text-left"
                                  onClick={() => {
                                    const el = document.querySelector(
                                      `[name="${field}"]`,
                                    );
                                    if (el) {
                                      el.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                      (el as HTMLElement).focus();
                                    }
                                  }}>
                                  {field
                                    .split("_")
                                    .map(
                                      (w) =>
                                        w.charAt(0).toUpperCase() + w.slice(1),
                                    )
                                    .join(" ")}
                                  : {error?.message as string}
                                </button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* All the same sub-form components as PostJob */}
                    <JobTitleForm />
                    <Separator />
                    <SalaryForm />
                    <Separator />
                    <AdditionalInformationForm />
                    <Separator />
                    <LocationForm />
                    <Separator />
                    <JobbenefitsForm />
                    <Separator />
                    <JobDescriptionForm />
                    <Separator />
                    <JobVisibilityForm />
                    <Separator />

                    {/* Status — edit-only, not on PostJob */}
                    <div>
                      <header className="space-y-1 border-b pb-2 w-full mb-4">
                        <h2 className="text-xl font-medium text-[#020C10]">
                          Job Status
                        </h2>
                      </header>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="max-w-xs">
                            <FormLabel>Status</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="published">
                                  Published
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>

          {/* Fixed footer */}
          <SheetFooter className="px-6 py-4 border-t shrink-0 flex flex-row justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeEdit}
              disabled={isSaving}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-job-form"
              disabled={isSaving || isLoading || !form.formState.isDirty}
              className="rounded-[6px] px-6">
              {isSaving ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* ── Delete Confirmation ─────────────────────────────────────────────── */}
      <AlertDialog
        open={!!deleteJobId}
        onOpenChange={(open) => !open && setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the job posting and all associated
              data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? "Deleting..." : "Delete Job"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}