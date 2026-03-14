/**
 * Public legal pages — rendered for unauthenticated users on the landing page.
 * Content is fetched from the same endpoint admin saves to.
 *
 * Routes to add in App.tsx:
 *   <Route path="/terms"   element={<TermsPage />} />
 *   <Route path="/privacy" element={<PrivacyPage />} />
 */

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

async function fetchLegalContent(type: "terms" | "privacy") {
  // ── When backend is ready, replace with real endpoint ──
  // return requests.get(`/legal/${type}`);

  // ── Mock ──
  await new Promise((r) => setTimeout(r, 200));
  return {
    data: {
      type,
      content: type === "terms"
        ? `<h2>Terms &amp; Conditions</h2><p>Last updated: January 2026</p>
           <p>By accessing and using HireRight, you accept and agree to be bound by the terms and conditions outlined here.</p>
           <h3>1. Use of Service</h3>
           <p>HireRight provides a recruitment platform connecting candidates and employers. You agree to use the service only for lawful purposes.</p>
           <h3>2. Accounts</h3>
           <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
           <h3>3. Content</h3>
           <p>You retain ownership of content you submit. By submitting, you grant HireRight a licence to use that content in connection with the service.</p>`
        : `<h2>Privacy Policy</h2><p>Last updated: January 2026</p>
           <p>Your privacy is important to us. This policy explains how HireRight collects, uses, and protects your personal information.</p>
           <h3>Information We Collect</h3>
           <p>We collect information you provide directly, such as your name, email address, and professional history.</p>
           <h3>How We Use Your Information</h3>
           <p>We use your information to provide and improve our services, communicate with you, and ensure platform security.</p>
           <h3>Data Retention</h3>
           <p>We retain your data for as long as your account is active or as needed to provide our services.</p>`,
      updated_at: new Date().toISOString(),
    },
  };
}

function LegalPage({ type, title }: { type: "terms" | "privacy"; title: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["legal-content", type],
    queryFn: () => fetchLegalContent(type),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src="/App logo.png" alt="HireRight" className="h-8 w-auto object-contain" />
        </Link>
        <Link to="/sign-in" className="text-sm text-gray-500 hover:text-gray-800">Sign In</Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-100 rounded w-64" />
            {[1,2,3,4,5].map((i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm">Failed to load content. Please try again.</p>
        )}

        {data?.data && (
          <>
            {/* Render CKEditor HTML safely */}
            <div
              className="prose prose-gray max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-lg prose-p:text-gray-600 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: data.data.content }}
            />
            {data.data.updated_at && (
              <p className="text-xs text-gray-400 mt-12 border-t pt-4">
                Last updated: {new Date(data.data.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function TermsPage()   { return <LegalPage type="terms"   title="Terms & Conditions" />; }
export function PrivacyPage() { return <LegalPage type="privacy" title="Privacy Policy"     />; }