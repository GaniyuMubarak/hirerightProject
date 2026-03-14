import AdminServices from "@/services/admin-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminEmployers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-employers", search, status],
    queryFn: () =>
      AdminServices.getEmployers({
        q: search || undefined,
        status: status || undefined,
      }),
  });

  const verifyMutation = useMutation({
    mutationFn: (id: number) => AdminServices.verifyEmployer(id),
    onSuccess: () => {
      toast.success("Employer verified");
      queryClient.invalidateQueries({ queryKey: ["admin-employers"] });
    },
    onError: () => toast.error("Failed to verify employer"),
  });

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: number;
      currentStatus: string;
    }) =>
      AdminServices.toggleEmployerStatus(
        id,
        currentStatus === "active" ? "suspended" : "active",
      ),
    onSuccess: (_, { currentStatus }) => {
      toast.success(
        `Employer ${currentStatus === "active" ? "suspended" : "reinstated"}`,
      );
      queryClient.invalidateQueries({ queryKey: ["admin-employers"] });
    },
    onError: () => toast.error("Failed to update employer status"),
  });

  const employers = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employers</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify and manage employer accounts
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company name or email..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-[12px] overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
            ))}
          </div>
        ) : employers.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No employers found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Company</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Jobs</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Verified
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Joined</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employers.map((emp: any) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{emp.email}</td>
                  <td className="px-4 py-3 text-gray-700">{emp.jobs_count}</td>
                  <td className="px-4 py-3">
                    {emp.is_verified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Unverified</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${emp.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(emp.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {!emp.is_verified && (
                        <button
                          onClick={() => verifyMutation.mutate(emp.id)}
                          disabled={verifyMutation.isPending}
                          className="text-xs px-2 py-1 rounded-[6px] bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            id: emp.id,
                            currentStatus: emp.status,
                          })
                        }
                        disabled={statusMutation.isPending}
                        className={`text-xs px-2 py-1 rounded-[6px] transition-colors
                          ${
                            emp.status === "active"
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}>
                        {emp.status === "active" ? "Suspend" : "Reinstate"}
                      </button>
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
