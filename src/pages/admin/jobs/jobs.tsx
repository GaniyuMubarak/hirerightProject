import AdminServices from "@/services/admin-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Flagged", value: "flagged" },
];

const STATUS_BADGE: Record<string, string> = {
  published: "bg-green-50 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  flagged: "bg-red-50 text-red-600",
  removed: "bg-red-100 text-red-800",
};

export default function AdminJobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-jobs", search, status],
    queryFn: () =>
      AdminServices.getJobs({
        q: search || undefined,
        status: status || undefined,
      }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      AdminServices.updateJobStatus(id, status),
    onSuccess: () => {
      toast.success("Job status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
    },
    onError: () => toast.error("Failed to update job status"),
  });

  const jobs = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and manage all job listings
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-[12px] overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No jobs found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 font-medium text-gray-600">Company</th>
                <th className="px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Applications
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Posted</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.map((job: any) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{job.company}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">
                    {job.employment_type?.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {job.applications}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[job.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(job.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {job.status !== "flagged" && (
                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              id: job.id,
                              status: "flagged",
                            })
                          }
                          disabled={statusMutation.isPending}
                          className="text-xs px-2 py-1 rounded-[6px] bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors">
                          Flag
                        </button>
                      )}
                      {job.status !== "published" && (
                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              id: job.id,
                              status: "published",
                            })
                          }
                          disabled={statusMutation.isPending}
                          className="text-xs px-2 py-1 rounded-[6px] bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                          Approve
                        </button>
                      )}
                      {job.status !== "removed" && (
                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              id: job.id,
                              status: "removed",
                            })
                          }
                          disabled={statusMutation.isPending}
                          className="text-xs px-2 py-1 rounded-[6px] bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
