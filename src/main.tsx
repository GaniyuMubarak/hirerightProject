import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import AccountTypePage from "./routes/auth/account-type.tsx";
import EmailVerification from "./routes/auth/email-verification.tsx";
import ForgotPassword from "./routes/auth/forgot-password.tsx";
import SignUpPage from "./routes/auth/sign-up.tsx";
import Dashboard from "./routes/dashboard/dashboad.tsx";
import DashboardLayout from "./routes/dashboard/layout.tsx";
import JobDetails from "./routes/jobs/job-details.tsx";
import JobList from "./routes/jobs/job-list.tsx";
import Onboarding from "./routes/onboarding/onboarding.tsx";
import EditProfile from "./routes/profile/edit.tsx";
import Profile from "./routes/profile/profile.tsx";
import Settings from "./routes/profile/settings.tsx";

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

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* /dashboard/jobs  */}
          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path=":id" element={<JobDetails />} />
          </Route>

          {/* /dashboard/profile  */}
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
