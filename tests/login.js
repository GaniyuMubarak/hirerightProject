/**
 * k6 test: Login flow
 * Endpoints: POST /auth/login → GET /candidates/profile
 *
 * Run (single user):   k6 run tests/login.js
 * Run (scaled):        k6 run --vus 100 --duration 1m tests/login.js
 *
 * IMPORTANT: Create real test accounts in your DB before running.
 * Replace TEST_ACCOUNTS below with actual credentials.
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "30s", target: 20 }, // ramp up to 20 users
    { duration: "1m", target: 100 }, // hold at 100 users
    { duration: "30s", target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% of requests under 1.5s
    http_req_failed: ["rate<0.01"], // less than 1% failure rate
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://api.hirerightapp.com/api";

// ✅ Use dedicated test accounts — never use real user credentials
const TEST_ACCOUNTS = [
  {
    email: "adegunlenurudeen214+test207@gmail.com",
    password: "Test@123",
    app_role: "candidate",
  },
  {
    email: "adegunlenurudeen214@gmail.com",
    password: "Test@123",
    app_role: "candidate",
  },
//   {
//     email: "loadtest3@example.com",
//     password: "Password123!",
//     app_role: "candidate",
//   },
];

export default function () {
  const account =
    TEST_ACCOUNTS[Math.floor(Math.random() * TEST_ACCOUNTS.length)];

  // ── Step 1: Login ─────────────────────────────────────────────────────────
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify(account),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const loginOk = check(loginRes, {
    "login: status 200": (r) => r.status === 200,
    "login: has token": (r) => !!JSON.parse(r.body)?.token,
  });

  errorRate.add(!loginOk);

  if (!loginOk) return;

  const token = JSON.parse(loginRes.body).token;
  sleep(1);

  // ── Step 2: Fetch protected resource ─────────────────────────────────────
  const profileRes = http.get(`${BASE_URL}/candidates/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  check(profileRes, {
    "profile: status 200": (r) => r.status === 200,
    "profile: has data": (r) => !!JSON.parse(r.body)?.data,
  });

  sleep(1);
}
