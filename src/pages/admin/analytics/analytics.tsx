import AdminServices from "@/services/admin-services";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Mock analytics data ──────────────────────────────────────────────────────
const HIRING_HISTORY = [
  { month: "Sep",  applications: 28,  hired: 4,  rejected: 18 },
  { month: "Oct",  applications: 45,  hired: 7,  rejected: 30 },
  { month: "Nov",  applications: 62,  hired: 9,  rejected: 42 },
  { month: "Dec",  applications: 38,  hired: 5,  rejected: 27 },
  { month: "Jan",  applications: 71,  hired: 12, rejected: 48 },
  { month: "Feb",  applications: 89,  hired: 15, rejected: 58 },
  { month: "Mar",  applications: 104, hired: 18, rejected: 70 },
];

const APPLICATION_STAGES = [
  { stage: "Applied",      count: 534 },
  { stage: "Shortlisted",  count: 210 },
  { stage: "Interviewed",  count: 98  },
  { stage: "Offered",      count: 42  },
  { stage: "Hired",        count: 28  },
];

const TEST_PERFORMANCE = [
  { month: "Oct", assigned: 40,  completed: 32, passed: 24 },
  { month: "Nov", assigned: 55,  completed: 48, passed: 36 },
  { month: "Dec", assigned: 38,  completed: 30, passed: 20 },
  { month: "Jan", assigned: 72,  completed: 65, passed: 50 },
  { month: "Feb", assigned: 88,  completed: 80, passed: 62 },
  { month: "Mar", assigned: 110, completed: 98, passed: 76 },
];

const TEST_SCORES = [
  { range: "0–20%",  count: 8  },
  { range: "21–40%", count: 14 },
  { range: "41–60%", count: 28 },
  { range: "61–80%", count: 42 },
  { range: "81–100%",count: 34 },
];

const SYSTEM_PERFORMANCE = [
  { time: "00:00", response_ms: 210, error_rate: 0.2, active_users: 12  },
  { time: "04:00", response_ms: 180, error_rate: 0.1, active_users: 4   },
  { time: "08:00", response_ms: 340, error_rate: 0.8, active_users: 48  },
  { time: "10:00", response_ms: 520, error_rate: 1.2, active_users: 92  },
  { time: "12:00", response_ms: 480, error_rate: 0.9, active_users: 118 },
  { time: "14:00", response_ms: 390, error_rate: 0.6, active_users: 104 },
  { time: "16:00", response_ms: 310, error_rate: 0.4, active_users: 87  },
  { time: "18:00", response_ms: 260, error_rate: 0.3, active_users: 65  },
  { time: "20:00", response_ms: 220, error_rate: 0.2, active_users: 43  },
  { time: "22:00", response_ms: 195, error_rate: 0.1, active_users: 21  },
];

const USER_GROWTH = [
  { month: "Sep", candidates: 12, employers: 3  },
  { month: "Oct", candidates: 28, employers: 6  },
  { month: "Nov", candidates: 44, employers: 9  },
  { month: "Dec", candidates: 38, employers: 7  },
  { month: "Jan", candidates: 62, employers: 14 },
  { month: "Feb", candidates: 81, employers: 18 },
  { month: "Mar", candidates: 97, employers: 22 },
];

const ROLE_DISTRIBUTION = [
  { name: "Candidates", value: 206, color: "#22c55e" },
  { name: "Employers",  value: 42,  color: "#EE7B36" },
];

const JOB_TYPE_DISTRIBUTION = [
  { name: "Full Time",  value: 48, color: "#3b82f6" },
  { name: "Part Time",  value: 12, color: "#8b5cf6" },
  { name: "Contract",   value: 18, color: "#f59e0b" },
  { name: "Freelance",  value: 11, color: "#ec4899" },
];

// ─── Shared card wrapper ──────────────────────────────────────────────────────
function ChartCard({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-[12px] p-5 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800 ml-auto">{value}</span>
    </div>
  );
}

export default function AdminAnalytics() {
  const { data: statsData } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => AdminServices.getStats(),
  });
  const stats = statsData?.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform performance overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: stats?.total_applications ?? 534, color: "text-blue-600" },
          { label: "Hire Rate",          value: "5.2%",                           color: "text-green-600" },
          { label: "Test Pass Rate",     value: "71%",                            color: "text-orange-600" },
          { label: "Avg Response Time",  value: "310ms",                          color: "text-purple-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border rounded-[12px] p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Hiring History ─────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-700">Hiring History</h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Applications over time */}
          <div className="lg:col-span-2">
            <ChartCard title="Applications vs Hires" subtitle="Monthly trend">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={HIRING_HISTORY}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="applications" stroke="#3b82f6" fill="url(#colorApps)"  name="Applications" strokeWidth={2} />
                  <Area type="monotone" dataKey="hired"        stroke="#22c55e" fill="url(#colorHired)" name="Hired"        strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Pipeline funnel */}
          <ChartCard title="Hiring Pipeline" subtitle="All time">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={APPLICATION_STAGES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" name="Candidates" radius={[0, 4, 4, 0]}>
                  {APPLICATION_STAGES.map((_, i) => (
                    <Cell key={i} fill={`hsl(${220 - i * 30}, 70%, ${50 + i * 5}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* ── Tests ──────────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-700">Test Performance</h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Assigned vs completed vs passed */}
          <div className="lg:col-span-2">
            <ChartCard title="Test Completion & Pass Rate" subtitle="Monthly">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={TEST_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="assigned"  name="Assigned"  fill="#93c5fd" radius={[4,4,0,0]} />
                  <Bar dataKey="completed" name="Completed" fill="#EE7B36" radius={[4,4,0,0]} />
                  <Bar dataKey="passed"    name="Passed"    fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Score distribution */}
          <ChartCard title="Score Distribution" subtitle="All tests">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={TEST_SCORES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Candidates" radius={[4,4,0,0]}>
                  {TEST_SCORES.map((_, i) => (
                    <Cell key={i} fill={`hsl(${120 + i * 20}, 60%, 55%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* ── System Performance ─────────────────────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-700">System Performance</h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Response time + error rate */}
          <div className="lg:col-span-2">
            <ChartCard title="Response Time & Error Rate" subtitle="Today by hour">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={SYSTEM_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left"  tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line yAxisId="left"  type="monotone" dataKey="response_ms"  stroke="#3b82f6" name="Response (ms)" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="error_rate"   stroke="#ef4444" name="Error rate %"  strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Active users */}
          <ChartCard title="Active Users Today" subtitle="By hour">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={SYSTEM_PERFORMANCE}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="active_users" stroke="#8b5cf6" fill="url(#colorUsers)" name="Active Users" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* ── User & Job breakdown ────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* User growth */}
        <div className="lg:col-span-2">
          <ChartCard title="User Growth" subtitle="New signups per month">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={USER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="candidates" name="Candidates" fill="#22c55e" radius={[4,4,0,0]} />
                <Bar dataKey="employers"  name="Employers"  fill="#EE7B36" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* User type split */}
        <ChartCard title="User Split" subtitle="By role">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ROLE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {ROLE_DISTRIBUTION.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {ROLE_DISTRIBUTION.map((d) => (
              <StatPill key={d.name} label={d.name} value={d.value} color={`bg-[${d.color}]`} />
            ))}
          </div>
        </ChartCard>

        {/* Job type split */}
        <ChartCard title="Job Types" subtitle="Active listings">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={JOB_TYPE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {JOB_TYPE_DISTRIBUTION.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {JOB_TYPE_DISTRIBUTION.map((d) => (
              <StatPill key={d.name} label={d.name} value={d.value} color="" />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}