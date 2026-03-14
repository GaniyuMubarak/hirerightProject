/**
 * k6 test: Registration flow
 * Endpoint: POST /auth/register
 *
 * Run (single user):   k6 run tests/register.js
 * Run (scaled):        k6 run --vus 50 --duration 30s tests/register.js
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp up to 10 users
    { duration: "1m", target: 50 }, // hold at 50 users
    { duration: "30s", target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests under 2s
    http_req_failed: ["rate<0.01"], // less than 1% failure rate
    errors: ["rate<0.05"], // less than 5% error rate
  },
};

const BASE_URL = __ENV.VITE_API_BASE_URL || "https://api.hirerightapp.com/api";

export default function () {
  const uniqueEmail = `loadtest+${Date.now()}_${Math.random().toString(36).substr(2, 5)}@example.com`;

  const res = http.post(
    `${BASE_URL}/auth/register`,
    JSON.stringify({
      first_name: "Load",
      last_name: "Test",
      email: uniqueEmail,
      password: "Password123!",
      password_confirmation: "Password123!",
      app_role: "candidate",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const ok = check(res, {
    "register: status 200 or 201": (r) => r.status === 200 || r.status === 201,
    "register: has message": (r) => !!JSON.parse(r.body)?.message,
  });

  errorRate.add(!ok);
  sleep(1);
}
