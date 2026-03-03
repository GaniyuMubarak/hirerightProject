// import axios, { InternalAxiosRequestConfig } from "axios";
// import Cookies from "js-cookie";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// // const navigate = useNavigate();

// type ResponseData = any;

// const instance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
//   timeout: 50000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(function (
//   config: InternalAxiosRequestConfig<any>
// ) {
//   let userInfo;
//   const userInfoCookie = Cookies.get("HRuserInfo");
//   if (userInfoCookie) {
//     userInfo = JSON.parse(userInfoCookie);
//   }

//   config.headers.set(
//     "authorization",
//     userInfo ? `Bearer ${userInfo.token}` : ""
//   );
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response?.status === 503) {
//       if (window.location.pathname !== "/sign-in") {
//         toast("System Maintenance in Progress. Please check back later.", {
//           duration: 5000,
//           position: "top-right",
//         });
//       } else {
//         localStorage.clear();
//         // Cookies.remove("adminInfo");
//         Cookies.remove("HRuserInfo");
//       }
//     }
//     if (error?.response?.status === 401) {
//       localStorage.clear();
//       Cookies.remove("adminInfo");
//       if (window.location.pathname !== "/sign-in") {
//         window.location.href = "/sign-in";
//         // navigate("/sign-in");
//       }

//       return Promise.reject(error);
//     } else if (error?.response?.status === 403) {
//       window.location.href = "/unauthorized";
//       // navigate("/unauthorized");
//       return Promise.reject(error);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// const responseBody = (response: any): ResponseData => response.data;

// const requests = {
//   get: (url: string, body?: any, headers?: any) =>
//     instance.get(url, { ...body, headers }).then(responseBody),

//   post: (url: string, body?: any) =>
//     instance.post(url, body).then(responseBody),

//   put: (url: string, body?: any, headers?: any) =>
//     instance.put(url, body, { headers }).then(responseBody),

//   patch: (url: string, body?: any) =>
//     instance.patch(url, body).then(responseBody),

//   delete: (url: string, body?: any) =>
//     instance.delete(url, { data: body }).then(responseBody),
// };

// export default requests;

// import axios, { InternalAxiosRequestConfig } from "axios";
// import Cookies from "js-cookie";
// import { toast } from "sonner";

// type ResponseData = any;

// // Track if we're refreshing the token
// let isRefreshing = false;
// // Queue failed requests while token refreshes
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// const instance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
//   timeout: 50000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor - add token to requests
// instance.interceptors.request.use(function (
//   config: InternalAxiosRequestConfig<any>,
// ) {
//   let userInfo;
//   const userInfoCookie = Cookies.get("HRuserInfo");
//   if (userInfoCookie) {
//     try {
//       userInfo = JSON.parse(userInfoCookie);
//     } catch (e) {
//       console.error("Failed to parse user info cookie", e);
//     }
//   }

//   if (userInfo?.token) {
//     config.headers.set("Authorization", `Bearer ${userInfo.token}`);
//   }
//   return config;
// });

// // Response interceptor - handle errors and token refresh
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 503 - Maintenance
//     if (error?.response?.status === 503) {
//       if (window.location.pathname !== "/sign-in") {
//         toast("System Maintenance in Progress. Please check back later.", {
//           duration: 5000,
//           position: "top-right",
//         });
//       }
//       return Promise.reject(error);
//     }

//     // Handle 401 - Unauthorized (token expired)
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       // Don't attempt refresh on login page
//       if (window.location.pathname === "/sign-in") {
//         return Promise.reject(error);
//       }

//       // If already refreshing, queue this request
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return instance(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Attempt to refresh the token
//         const userInfoCookie = Cookies.get("HRuserInfo");
//         if (!userInfoCookie) {
//           throw new Error("No user info found");
//         }

//         const userInfo = JSON.parse(userInfoCookie);

//         // Call your refresh token endpoint
//         // You need to implement this endpoint on your backend
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
//           {}, // Empty body if using httpOnly cookies
//           { withCredentials: true }, // Important if using cookies
//         );

//         // If your backend uses httpOnly cookies, you might not get a new token in response
//         // The cookie will be set automatically by the browser
//         const newToken = response.data.token || userInfo.token;

//         // Update cookie with new token (if your API returns it)
//         if (response.data.token) {
//           const updatedUserInfo = {
//             ...userInfo,
//             token: response.data.token,
//           };
//           Cookies.set("HRuserInfo", JSON.stringify(updatedUserInfo), {
//             expires: 7,
//             secure: true,
//             sameSite: "strict",
//           });
//         }

//         // Update default header
//         instance.defaults.headers.common["Authorization"] =
//           `Bearer ${newToken}`;

//         // Process queued requests
//         processQueue(null, newToken);

//         // Retry original request
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed - clear everything and redirect to login
//         processQueue(refreshError, null);

//         // Clear all auth data
//         localStorage.clear();
//         Cookies.remove("HRuserInfo");
//         Cookies.remove("adminInfo"); // Remove this if not needed

//         if (window.location.pathname !== "/sign-in") {
//           toast("Your session has expired. Please sign in again.", {
//             duration: 5000,
//             position: "top-right",
//           });

//           // Use window.location for hard redirect (clears all state)
//           window.location.href = "/sign-in";
//         }

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // Handle 403 - Forbidden
//     if (error?.response?.status === 403) {
//       window.location.href = "/unauthorized";
//       return Promise.reject(error);
//     }

//     // Handle 404 - Not Found (log for debugging)
//     if (error?.response?.status === 404) {
//       console.error("API endpoint not found:", error.config?.url);
//       toast("Resource not found", {
//         duration: 3000,
//         position: "top-right",
//       });
//     }

//     return Promise.reject(error);
//   },
// );

// const responseBody = (response: any): ResponseData => response.data;

// const requests = {
//   get: (url: string, body?: any, headers?: any) =>
//     instance.get(url, { ...body, headers }).then(responseBody),

//   post: (url: string, body?: any) =>
//     instance.post(url, body).then(responseBody),

//   put: (url: string, body?: any, headers?: any) =>
//     instance.put(url, body, { headers }).then(responseBody),

//   patch: (url: string, body?: any) =>
//     instance.patch(url, body).then(responseBody),

//   delete: (url: string, body?: any) =>
//     instance.delete(url, { data: body }).then(responseBody),
// };

// export default requests;





import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type ResponseData = any;

// ---------------------------------------------------------------------------
// Token storage helpers
// ---------------------------------------------------------------------------

const COOKIE_KEY = "HRuserInfo";
const TOKEN_EXPIRY_DAYS = 7;

const cookieOptions = {
  expires: TOKEN_EXPIRY_DAYS,
  secure: true,
  sameSite: "strict" as const,
};

function getUserInfo(): { token: string; refreshToken: string } | null {
  const raw = Cookies.get(COOKIE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setUserInfo(patch: Partial<{ token: string; refreshToken: string }>) {
  const current = getUserInfo() ?? {};
  Cookies.set(
    COOKIE_KEY,
    JSON.stringify({ ...current, ...patch }),
    cookieOptions,
  );
}

function clearAuth() {
  localStorage.clear();
  Cookies.remove(COOKIE_KEY);
}

// ---------------------------------------------------------------------------
// Refresh-queue management
// ---------------------------------------------------------------------------

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach access token
// ---------------------------------------------------------------------------

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userInfo = getUserInfo();
  if (userInfo?.token) {
    config.headers.set("Authorization", `Bearer ${userInfo.token}`);
  }
  return config;
});



instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status: number | undefined = error?.response?.status;

    // ── 503 Maintenance ────────────────────────────────────────────────────
    if (status === 503) {
      if (window.location.pathname !== "/sign-in") {
        toast("System Maintenance in Progress. Please check back later.", {
          duration: 5000,
          position: "top-right",
        });
      }
      return Promise.reject(error);
    }

    // ── 401 Unauthorized — attempt refresh token rotation ─────────────────
    if (status === 401 && !originalRequest._retry) {
      // Never attempt refresh on the login page itself
      if (window.location.pathname === "/sign-in") {
        return Promise.reject(error);
      }

      // Queue subsequent 401s while a refresh is already in-flight
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userInfo = getUserInfo();

        if (!userInfo?.refreshToken) {
          throw new Error("No refresh token available");
        }

        // ── Refresh call — sends the current refresh token ────────────────
        // The backend MUST respond with a brand-new refresh token (rotation).
        // Expected response shape:
        //   { token: string; refreshToken: string; expiresIn?: number }
        const { data } = await axios.post<{
          token: string;
          refreshToken: string;
        }>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken: userInfo.refreshToken },
          {
            // Skip our own interceptor so a 401 here doesn't loop forever
            headers: { "X-Skip-Interceptor": "1" },
          },
        );

        const { token: newToken, refreshToken: newRefreshToken } = data;

        // Persist rotated tokens — both expire in 7 days
        setUserInfo({ token: newToken, refreshToken: newRefreshToken });

        // Update default header for any requests created after this point
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        // Flush the queue with the fresh access token
        processQueue(null, newToken);

        // Retry the original failed request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();

        if (window.location.pathname !== "/sign-in") {
          toast("Your session has expired. Please sign in again.", {
            duration: 5000,
            position: "top-right",
          });
          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 Forbidden ──────────────────────────────────────────────────────
    if (status === 403) {
      window.location.href = "/unauthorized";
      return Promise.reject(error);
    }
    // if (status === 403) {
    //   toast("Access denied. Please sign in with the correct account type.", {
    //     duration: 4000,
    //     position: "top-right",
    //   });
    //   window.location.href = "/account-type";
    //   return Promise.reject(error);
    // }

    // ── 404 Not Found ──────────────────────────────────────────────────────
    if (status === 404) {
      console.error("API endpoint not found:", error.config?.url);
      toast("Resource not found", { duration: 3000, position: "top-right" });
    }

    return Promise.reject(error);
  },
);



/**
 * Call once after a successful login to persist both tokens.
 *
 * @example
 * const { token, refreshToken } = await loginApi(credentials);
 * persistAuthTokens(token, refreshToken);
 */
export function persistAuthTokens(token: string, refreshToken: string) {
  setUserInfo({ token, refreshToken });
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ---------------------------------------------------------------------------
// Request wrappers
// ---------------------------------------------------------------------------

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