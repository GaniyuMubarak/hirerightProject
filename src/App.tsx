import DashboardLayout from "@/components/candidate/layout";
import "@/index.css";
import AccountTypePage from "@/pages/auth/account-type";
import EmailVerification from "@/pages/auth/email-verification";
import ForgotPassword from "@/pages/auth/forgot-password";
import SignUpPage from "@/pages/auth/sign-up";
import Dashboard from "@/pages/candidate/dashboard/dashboad";
import JobDetails from "@/pages/candidate/jobs/job-details";
import JobList from "@/pages/candidate/jobs/job-list";
import Onboarding from "@/pages/candidate/onboarding/onboarding";
import EditProfile from "@/pages/candidate/profile/edit";
import Profile from "@/pages/candidate/profile/profile";
import Settings from "@/pages/candidate/profile/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from ".";
import CandidatesList from "./components/employer/candidates/candidates-list";
import EmployerDashboardLayout from "./components/employer/layout";
import SignInPage from "./pages/auth/sign-in";
import MyJobs from "./pages/candidate/my-jobs/my-jobs";
import CandidateDetails from "./pages/employer/candidate/details";
import EmployerDashboard from "./pages/employer/dashboard/dashboard";
import HiringProcess from "./pages/employer/job/hiring-process";
import EmployerJobList from "./pages/employer/job/job-list";
import PostJob from "./pages/employer/job/post";
import EmployerOnboarding from "./pages/employer/onboarding/onboarding";
import StaffList from "./pages/employer/staff/staff-list";
import EmployerCreatText from "./pages/employer/test/create";
import EmployerTests from "./pages/employer/test/test";
import ProtectedRoute from "./providers/protected-route";
import { UserProvider } from "./providers/user-context";
import EmployerProfilePage from "./pages/employer/profile/profile";
import EmployerProfileEditPage from "./pages/employer/profile/edit";
export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/account-type" element={<AccountTypePage />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<ProtectedRoute />}>
              {/* Candidate  */}
              <Route path="/candidate/onboarding" element={<Onboarding />} />
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

              {/* Employer */}
              <Route
                path="/employer/onboarding"
                element={<EmployerOnboarding />}
              />
              <Route path="employer" element={<EmployerDashboardLayout />}>
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="jobs">
                  <Route index element={<EmployerJobList />} />
                  <Route path="post" element={<PostJob />} />
                  <Route
                    path=":jobId/applications"
                    element={<HiringProcess />}
                  />
                </Route>
                <Route path="candidates">
                  <Route index element={<CandidatesList />} />
                  <Route path=":id" element={<CandidateDetails />} />
                </Route>
                <Route path="tests">
                  <Route index element={<EmployerTests />} />
                  <Route path="create" element={<EmployerCreatText />} />
                </Route>
                <Route path="staffs">
                  <Route index element={<StaffList />} />
                  <Route path="create" element={<EmployerCreatText />} />
                </Route>
                <Route path="profile" element={<EmployerProfilePage />} />
                <Route
                  path="profile/edit"
                  element={<EmployerProfileEditPage />}
                />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
