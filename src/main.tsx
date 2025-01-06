import App from "@/App.tsx";
import DashboardLayout from "@/components/candidate/layout";
import { Toaster } from "@/components/ui/sonner.tsx";
import "@/index.css";
import AccountTypePage from "@/routes/auth/account-type.tsx";
import EmailVerification from "@/routes/auth/email-verification.tsx";
import ForgotPassword from "@/routes/auth/forgot-password.tsx";
import SignUpPage from "@/routes/auth/sign-up.tsx";
import Dashboard from "@/routes/candidate/dashboard/dashboad.tsx";
import JobDetails from "@/routes/candidate/jobs/job-details.tsx";
import JobList from "@/routes/candidate/jobs/job-list.tsx";
import Onboarding from "@/routes/candidate/onboarding/onboarding.tsx";
import EditProfile from "@/routes/candidate/profile/edit.tsx";
import Profile from "@/routes/candidate/profile/profile.tsx";
import Settings from "@/routes/candidate/profile/settings.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import MyJobs from "./routes/candidate/my-jobs/my-jobs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/account-type" element={<AccountTypePage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard  */}

        <Route path="candidate" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* /dashboard/jobs  */}
          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path=":id" element={<JobDetails />} />
          </Route>

          <Route path="my-jobs" element={<MyJobs />} />

          {/* /dashboard/profile  */}
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
        {/* <Route path="employer" element={<DashboardLayout />}>
          <Route path="/onboarding" element={<EmployerOnboarding />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
