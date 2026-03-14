import AdminServices from "@/services/admin-services";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BriefcaseIcon,
  ClipboardList,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  href,
  color,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: any;
  href: string;
  color: string;
}) {
  return (
    <Link
      to={href}
      className="bg-white rounded-[12px] border p-5 flex items-start justify-between hover:shadow-md transition-shadow group">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">
          {value?.toLocaleString()}
        </p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div
        className={`w-10 h-10 rounded-[8px] flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => AdminServices.getStats(),
  });

  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-[12px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform overview</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={stats?.total_users ?? 0}
          sub={`+${stats?.new_users_this_week ?? 0} this week`}
          icon={Users}
          href="/admin/users"
          color="bg-blue-500"
        />
        <StatCard
          label="Employers"
          value={stats?.total_employers ?? 0}
          icon={TrendingUp}
          href="/admin/employers"
          color="bg-orange-500"
        />
        <StatCard
          label="Candidates"
          value={stats?.total_candidates ?? 0}
          icon={ClipboardList}
          href="/admin/candidates"
          color="bg-green-500"
        />
        <StatCard
          label="Active Jobs"
          value={stats?.active_jobs ?? 0}
          sub={`${stats?.total_jobs ?? 0} total`}
          icon={BriefcaseIcon}
          href="/admin/jobs"
          color="bg-purple-500"
        />
      </div>

      {/* Quick links */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          {
            label: "Manage Users",
            desc: "View, activate or deactivate user accounts",
            href: "/admin/users",
            color: "text-blue-600",
          },
          {
            label: "Review Jobs",
            desc: "Approve, flag or remove job listings",
            href: "/admin/jobs",
            color: "text-purple-600",
          },
          {
            label: "Manage Tests",
            desc: "Create and assign onboarding tests for candidates",
            href: "/admin/tests",
            color: "text-orange-600",
          },
          {
            label: "Verify Employers",
            desc: "Review and verify employer company profiles",
            href: "/admin/employers",
            color: "text-green-600",
          },
          {
            label: "View Candidates",
            desc: "Browse and manage candidate profiles",
            href: "/admin/candidates",
            color: "text-pink-600",
          },
        ].map(({ label, desc, href, color }) => (
          <Link
            key={href}
            to={href}
            className="bg-white border rounded-[12px] p-5 hover:shadow-md transition-shadow group flex items-start justify-between">
            <div>
              <p className={`font-semibold text-sm ${color}`}>{label}</p>
              <p className="text-gray-500 text-xs mt-1">{desc}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
