import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";



// const navigate = useNavigate();

type ResponseData = any;

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig<any>
) {
  let userInfo;
  const userInfoCookie = Cookies.get("HRuserInfo");
  if (userInfoCookie) {
    userInfo = JSON.parse(userInfoCookie);
  }

  config.headers.set(
    "authorization",
    userInfo ? `Bearer ${userInfo.token}` : ""
  );
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 503) {
      if (window.location.pathname !== "/sign-in") {
        toast("System Maintenance in Progress. Please check back later.", {
          duration: 5000,
          position: "top-right",
        });
      } else {
        localStorage.clear();
        Cookies.remove("adminInfo");
      }
    }
    if (error?.response?.status === 401) {
      localStorage.clear();
      Cookies.remove("adminInfo");
      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
        // navigate("/sign-in");
      }

      return Promise.reject(error);
    } else if (error?.response?.status === 403) {
      window.location.href = "/unauthorized";
      // navigate("/unauthorized");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

const responseBody = (response: any): ResponseData => response.data;

const requests = {
  get: (url: string, body?: any, headers?: any) =>
    instance.get(url, { ...body, headers }).then(responseBody),

  post: (url: string, body?: any) =>
    instance.post(url, body).then(responseBody),

  put: (url: string, body?: any, headers?: any) =>
    instance.put(url, body, { headers }).then(responseBody),

  patch: (url: string, body?: any) =>
    instance.patch(url, body).then(responseBody),

  delete: (url: string, body?: any) =>
    instance.delete(url, { data: body }).then(responseBody),
};

export default requests;
