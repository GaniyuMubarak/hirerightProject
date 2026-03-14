/**
 * k6 test: Candidate onboarding
 * Endpoint: POST /candidates/profile
 *
 * Run (single user):   k6 run tests/onboarding.js
 * Run (scaled):        k6 run --vus 30 --duration 1m tests/onboarding.js
 *
 * IMPORTANT: Replace test account credentials below before running.
 * This test logs in first to get a token, then submits the onboarding form.
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp up
    { duration: "1m", target: 30 }, // hold
    { duration: "30s", target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"], // file uploads are slower — allow 5s
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://api.hirerightapp.com/api";

function getToken() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: "adegunlenurudeen214+test207@gmail.com",
      password: "Test@123",
      app_role: "candidate",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  return JSON.parse(res.body)?.token ?? null;
}

export default function () {
  const token = getToken();

  if (!token) return;

  // k6 sends plain object as multipart/form-data automatically
  const formData = {
    first_name: "Load",
    last_name: "Test",
    phone: "08000000000",
    address: "Test Address",
    bio: "Load test bio",
    title: "Tester",
    "education[0][institution]": "Test University",
    "education[0][degree]": "BSc",
    "education[0][field_of_study]": "Computer Science",
    "education[0][is_current]": "0",
    "experiences[0][company_name]": "Test Company",
    "experiences[0][job_title]": "Developer",
    "experiences[0][is_current]": "0",
    "certifications[0][name]": "AWS",
    "certifications[0][organization]": "Amazon",
    "certifications[0][has_expiry]": "0",
  };

  const res = http.post(`${BASE_URL}/candidates/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const ok = check(res, {
    "onboarding: status 200 or 201": (r) =>
      r.status === 200 || r.status === 201,
    "onboarding: has data": (r) => !!JSON.parse(r.body)?.data,
  });

  errorRate.add(!ok);
  sleep(2);
}
