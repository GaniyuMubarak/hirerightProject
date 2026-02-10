import DashboardLayout from "@/components/candidate/layout";
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
import IndexPage from ".";
import CandidatesList from "./components/employer/candidates/candidates-list";
import EmployerDashboardLayout from "./components/employer/layout";
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
import EmployerProfilePage from "./pages/employer/profile/profile";
// import EmployerProfileEditP from "./pages/employer/profile/edit";
import EmployerProfileEditPage from "./pages/employer/profile/edit";

export const routes = [
  {
    path: "/",
    element: IndexPage,
  },
  {
    path: "/sign-up",
    element: SignUpPage,
  },
  {
    path: "/account-type",
    element: AccountTypePage,
  },
  {
    path: "/email-verification",
    element: EmailVerification,
  },
  {
    path: "/forgot-password",
    element: ForgotPassword,
  },
  {
    path: "/onboarding",
    element: Onboarding,
  },
  {
    path: "candidate",
    element: DashboardLayout,
    children: [
      {
        path: "dashboard",
        element: Dashboard,
      },
      {
        path: "jobs",
        children: [
          {
            path: "",
            element: JobList,
          },
          {
            path: ":id",
            element: JobDetails,
          },
        ],
      },
      {
        path: "my-jobs",
        element: MyJobs,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: Profile,
          },
          {
            path: "settings",
            element: Settings,
          },
          {
            path: "edit",
            element: EditProfile,
          },
        ],
      },
    ],
  },
  {
    path: "employer",
    children: [
      {
        path: "onboarding",
        element: EmployerOnboarding,
      },
      {
        path: "",
        element: EmployerDashboardLayout,
        children: [
          {
            path: "dashboard",
            element: EmployerDashboard,
          },
          {
            path: "jobs",
            children: [
              {
                path: "",
                element: EmployerJobList,
              },
              {
                path: "post",
                element: PostJob,
              },
              {
                path: "applications",
                element: HiringProcess,
              },
            ],
          },
          {
            path: "candidates",
            children: [
              {
                path: "",
                element: CandidatesList,
              },
              {
                path: ":id",
                element: CandidateDetails,
              },
            ],
          },
          {
            path: "tests",
            children: [
              {
                path: "",
                element: EmployerTests,
              },
              {
                path: "create",
                element: EmployerCreatText,
              },
            ],
          },
          {
            path: "staffs",
            children: [
              {
                path: "",
                element: StaffList,
              },
              {
                path: "create",
                element: EmployerCreatText,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                path: "",
                element: EmployerProfilePage,
              },
              // {
              //   path: "create",
              //   element: EmployerCreatText,
              // },
              {
                path: "edit", 
                element: EmployerProfileEditPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
