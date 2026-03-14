import AdminServices from "@/services/admin-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCandidates() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-candidates", search, status],
    queryFn: () =>
      AdminServices.getCandidates({
        q: search || undefined,
        status: status || undefined,
      }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: number;
      currentStatus: string;
    }) =>
      AdminServices.toggleCandidateStatus(
        id,
        currentStatus === "active" ? "inactive" : "active",
      ),
    onSuccess: (_, { currentStatus }) => {
      toast.success(
        `Candidate ${currentStatus === "active" ? "deactivated" : "activated"}`,
      );
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
    },
    onError: () => toast.error("Failed to update candidate status"),
  });

  const candidates = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
        <p className="text-gray-500 text-sm mt-1">
          View and manage candidate profiles
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
        ) : candidates.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No candidates found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Applications
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Onboarded
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Joined</th>
                <th className="px-4 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {candidates.map((candidate: any) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {candidate.first_name} {candidate.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{candidate.email}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {candidate.applications}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs ${candidate.onboarded ? "text-green-600" : "text-gray-400"}`}>
                      {candidate.onboarded ? "Complete" : "Incomplete"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${candidate.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(candidate.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        toggleMutation.mutate({
                          id: candidate.id,
                          currentStatus: candidate.status,
                        })
                      }
                      disabled={toggleMutation.isPending}
                      className={`text-xs font-medium px-3 py-1 rounded-[6px] transition-colors
                        ${
                          candidate.status === "active"
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}>
                      {candidate.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
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
