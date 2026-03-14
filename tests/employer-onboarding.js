/**
 * k6 test: Employer company profile creation
 * Endpoint: POST /employers/company
 *
 * Run (single user):   k6 run tests/employer-onboarding.js
 * Run (scaled):        k6 run --vus 20 --duration 1m tests/employer-onboarding.js
 *
 * IMPORTANT: Replace test account credentials below before running.
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "1m", target: 20 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<3000"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://api.hirerightapp.com/api";

function getToken() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: "adegunlenurudeen214+test110@gmail.com",
      password: "Test@123",
      app_role: "employer",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  return JSON.parse(res.body)?.token ?? null;
}

export default function () {
  const token = getToken();

  if (!token) return;

  const res = http.post(
    `${BASE_URL}/employers/company`,
    JSON.stringify({
      name: "Load Test Company",
      email: `company+${Date.now()}@example.com`,
      phone: "08000000000",
      about: "Load test company description",
      address: "123 Test Street",
      city: "Lagos",
      state: "Lagos",
      country: "NG",
      size_min: 1,
      size_max: 50,
      industry_code: "Technology",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  const ok = check(res, {
    "employer onboarding: status 200 or 201": (r) =>
      r.status === 200 || r.status === 201,
    "employer onboarding: has data": (r) => !!JSON.parse(r.body)?.data,
  });

  errorRate.add(!ok);
  sleep(2);
}
