import requests from "@/services/https-services";

// ─── Mock flag ────────────────────────────────────────────────────────────────
// Flip to false when the backend admin endpoints are ready.
// Each function checks this independently so you can migrate one at a time.
const USE_MOCK = true;
// const USE_MOCK = false; // ← this one line switches everything to real API

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@example.com",
    app_role: "candidate",
    status: "active",
    created_at: "2026-01-10T08:00:00Z",
    email_verified: true,
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@example.com",
    app_role: "employer",
    status: "active",
    created_at: "2026-01-12T09:30:00Z",
    email_verified: true,
  },
  {
    id: 3,
    first_name: "Clara",
    last_name: "Davis",
    email: "clara@example.com",
    app_role: "candidate",
    status: "inactive",
    created_at: "2026-01-14T11:00:00Z",
    email_verified: false,
  },
  {
    id: 4,
    first_name: "David",
    last_name: "Lee",
    email: "david@example.com",
    app_role: "employer",
    status: "active",
    created_at: "2026-01-20T14:00:00Z",
    email_verified: true,
  },
  {
    id: 5,
    first_name: "Eva",
    last_name: "Brown",
    email: "eva@example.com",
    app_role: "candidate",
    status: "active",
    created_at: "2026-02-01T10:00:00Z",
    email_verified: true,
  },
  {
    id: 6,
    first_name: "Frank",
    last_name: "Wilson",
    email: "frank@example.com",
    app_role: "candidate",
    status: "inactive",
    created_at: "2026-02-05T16:00:00Z",
    email_verified: true,
  },
  {
    id: 7,
    first_name: "Grace",
    last_name: "Taylor",
    email: "grace@example.com",
    app_role: "employer",
    status: "active",
    created_at: "2026-02-10T08:00:00Z",
    email_verified: true,
  },
  {
    id: 8,
    first_name: "Henry",
    last_name: "Martinez",
    email: "henry@example.com",
    app_role: "candidate",
    status: "active",
    created_at: "2026-02-14T09:00:00Z",
    email_verified: false,
  },
];

const MOCK_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    status: "published",
    created_at: "2026-02-01T08:00:00Z",
    applications: 12,
    employment_type: "full_time",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems",
    status: "published",
    created_at: "2026-02-05T09:00:00Z",
    applications: 8,
    employment_type: "full_time",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupHub",
    status: "draft",
    created_at: "2026-02-10T10:00:00Z",
    applications: 0,
    employment_type: "contract",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "CreativeLabs",
    status: "published",
    created_at: "2026-02-12T11:00:00Z",
    applications: 5,
    employment_type: "full_time",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Analytics Co",
    status: "flagged",
    created_at: "2026-02-15T12:00:00Z",
    applications: 3,
    employment_type: "part_time",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudBase",
    status: "published",
    created_at: "2026-02-20T08:00:00Z",
    applications: 7,
    employment_type: "full_time",
  },
];

const MOCK_EMPLOYERS = [
  {
    id: 1,
    name: "TechCorp",
    email: "info@techcorp.com",
    is_verified: true,
    status: "active",
    jobs_count: 5,
    created_at: "2026-01-05T08:00:00Z",
  },
  {
    id: 2,
    name: "DataSystems",
    email: "hr@datasystems.com",
    is_verified: true,
    status: "active",
    jobs_count: 3,
    created_at: "2026-01-10T09:00:00Z",
  },
  {
    id: 3,
    name: "StartupHub",
    email: "jobs@startuphub.com",
    is_verified: false,
    status: "active",
    jobs_count: 1,
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: 4,
    name: "CreativeLabs",
    email: "talent@creative.com",
    is_verified: true,
    status: "active",
    jobs_count: 4,
    created_at: "2026-01-20T11:00:00Z",
  },
  {
    id: 5,
    name: "CloudBase",
    email: "people@cloudbase.com",
    is_verified: false,
    status: "suspended",
    jobs_count: 2,
    created_at: "2026-02-01T12:00:00Z",
  },
];

const MOCK_CANDIDATES = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@example.com",
    status: "active",
    applications: 4,
    onboarded: true,
    created_at: "2026-01-10T08:00:00Z",
  },
  {
    id: 3,
    first_name: "Clara",
    last_name: "Davis",
    email: "clara@example.com",
    status: "inactive",
    applications: 0,
    onboarded: false,
    created_at: "2026-01-14T11:00:00Z",
  },
  {
    id: 5,
    first_name: "Eva",
    last_name: "Brown",
    email: "eva@example.com",
    status: "active",
    applications: 2,
    onboarded: true,
    created_at: "2026-02-01T10:00:00Z",
  },
  {
    id: 6,
    first_name: "Frank",
    last_name: "Wilson",
    email: "frank@example.com",
    status: "inactive",
    applications: 1,
    onboarded: true,
    created_at: "2026-02-05T16:00:00Z",
  },
  {
    id: 8,
    first_name: "Henry",
    last_name: "Martinez",
    email: "henry@example.com",
    status: "active",
    applications: 3,
    onboarded: false,
    created_at: "2026-02-14T09:00:00Z",
  },
];

const MOCK_TESTS = [
  {
    id: 1,
    title: "General Aptitude Test",
    description: "Basic aptitude assessment for all candidates",
    questions_count: 20,
    duration_minutes: 30,
    is_active: true,
    created_at: "2026-01-10T08:00:00Z",
    assigned_jobs: 3,
  },
  {
    id: 2,
    title: "Technical Skills - Web",
    description: "HTML, CSS, JS fundamentals",
    questions_count: 15,
    duration_minutes: 45,
    is_active: true,
    created_at: "2026-01-15T09:00:00Z",
    assigned_jobs: 2,
  },
  {
    id: 3,
    title: "Communication Assessment",
    description: "Written and verbal communication skills",
    questions_count: 10,
    duration_minutes: 20,
    is_active: false,
    created_at: "2026-01-20T10:00:00Z",
    assigned_jobs: 0,
  },
  {
    id: 4,
    title: "Leadership & Teamwork",
    description: "Behavioural assessment for senior roles",
    questions_count: 12,
    duration_minutes: 25,
    is_active: true,
    created_at: "2026-02-01T08:00:00Z",
    assigned_jobs: 1,
  },
];

const MOCK_STATS = {
  total_users: 248,
  total_employers: 42,
  total_candidates: 206,
  total_jobs: 89,
  active_jobs: 67,
  total_applications: 534,
  new_users_this_week: 18,
  new_jobs_this_week: 7,
};

// ─── Mock delay helper ────────────────────────────────────────────────────────
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── Service functions ────────────────────────────────────────────────────────

const AdminServices = {
  // Dashboard
  getStats: async () => {
    if (USE_MOCK) {
      await delay();
      return { data: MOCK_STATS };
    }
    return requests.get("/admin/stats");
  },

  // Users
  getUsers: async (params?: { role?: string; status?: string; q?: string }) => {
    if (USE_MOCK) {
      await delay();
      let users = [...MOCK_USERS];
      if (params?.role) users = users.filter((u) => u.app_role === params.role);
      if (params?.status)
        users = users.filter((u) => u.status === params.status);
      if (params?.q)
        users = users.filter((u) =>
          `${u.first_name} ${u.last_name} ${u.email}`
            .toLowerCase()
            .includes(params.q!.toLowerCase()),
        );
      return { data: users };
    }
    const q = new URLSearchParams(params as any).toString();
    return requests.get(`/admin/users${q ? `?${q}` : ""}`);
  },

  toggleUserStatus: async (id: number, status: "active" | "inactive") => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, status } };
    }
    return requests.patch(`/admin/users/${id}/status`, { status });
  },

  // Jobs
  getJobs: async (params?: { status?: string; q?: string }) => {
    if (USE_MOCK) {
      await delay();
      let jobs = [...MOCK_JOBS];
      if (params?.status) jobs = jobs.filter((j) => j.status === params.status);
      if (params?.q)
        jobs = jobs.filter((j) =>
          `${j.title} ${j.company}`
            .toLowerCase()
            .includes(params.q!.toLowerCase()),
        );
      return { data: jobs };
    }
    const q = new URLSearchParams(params as any).toString();
    return requests.get(`/admin/jobs${q ? `?${q}` : ""}`);
  },

  updateJobStatus: async (id: number, status: string) => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, status } };
    }
    return requests.patch(`/admin/jobs/${id}/status`, { status });
  },

  // Employers
  getEmployers: async (params?: { status?: string; q?: string }) => {
    if (USE_MOCK) {
      await delay();
      let employers = [...MOCK_EMPLOYERS];
      if (params?.status)
        employers = employers.filter((e) => e.status === params.status);
      if (params?.q)
        employers = employers.filter((e) =>
          `${e.name} ${e.email}`
            .toLowerCase()
            .includes(params.q!.toLowerCase()),
        );
      return { data: employers };
    }
    const q = new URLSearchParams(params as any).toString();
    return requests.get(`/admin/employers${q ? `?${q}` : ""}`);
  },

  verifyEmployer: async (id: number) => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, is_verified: true } };
    }
    return requests.patch(`/admin/employers/${id}/verify`);
  },

  toggleEmployerStatus: async (id: number, status: "active" | "suspended") => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, status } };
    }
    return requests.patch(`/admin/employers/${id}/status`, { status });
  },

  // Candidates
  getCandidates: async (params?: { status?: string; q?: string }) => {
    if (USE_MOCK) {
      await delay();
      let candidates = [...MOCK_CANDIDATES];
      if (params?.status)
        candidates = candidates.filter((c) => c.status === params.status);
      if (params?.q)
        candidates = candidates.filter((c) =>
          `${c.first_name} ${c.last_name} ${c.email}`
            .toLowerCase()
            .includes(params.q!.toLowerCase()),
        );
      return { data: candidates };
    }
    const q = new URLSearchParams(params as any).toString();
    return requests.get(`/admin/candidates${q ? `?${q}` : ""}`);
  },

  toggleCandidateStatus: async (id: number, status: "active" | "inactive") => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, status } };
    }
    return requests.patch(`/admin/candidates/${id}/status`, { status });
  },

  // Tests
  getTests: async () => {
    if (USE_MOCK) {
      await delay();
      return { data: MOCK_TESTS };
    }
    return requests.get("/admin/tests");
  },

  createTest: async (data: any) => {
    if (USE_MOCK) {
      await delay(400);
      const newTest = {
        id: Date.now(),
        ...data,
        questions_count: data.questions?.length ?? 0,
        assigned_jobs: 0,
        created_at: new Date().toISOString(),
      };
      return { data: newTest };
    }
    return requests.post("/admin/tests", data);
  },

  updateTest: async (id: number, data: any) => {
    if (USE_MOCK) {
      await delay(300);
      return { data: { id, ...data } };
    }
    return requests.put(`/admin/tests/${id}`, data);
  },

  toggleTestStatus: async (id: number, is_active: boolean) => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id, is_active } };
    }
    return requests.patch(`/admin/tests/${id}/status`, { is_active });
  },

  deleteTest: async (id: number) => {
    if (USE_MOCK) {
      await delay(200);
      return { data: { id } };
    }
    return requests.delete(`/admin/tests/${id}`);
  },
};

export default AdminServices;
