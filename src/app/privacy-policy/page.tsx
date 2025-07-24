import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="flex justify-center text-3xl font-bold p-4 mb-8">
          Privacy Policy
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-[#1ED760] mb-4">
              Privacy Policy for SPAZ
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Effective Date:</strong> January 23, 2025
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Last Updated:</strong> January 23, 2025
            </p>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            Welcome to <strong>SPAZ (SPotify music AnalyZer)</strong> — your
            personalized Spotify analytics dashboard. We are committed to
            protecting your privacy and being transparent about how we collect,
            use, and safeguard your information. This Privacy Policy explains
            our practices when you use our service.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            1. Information We Collect
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            a. Spotify Account Data
          </h3>
          <p className="mb-4">
            When you connect your Spotify account, we access the following
            information through Spotify&apos;s Web API, only with your explicit
            permission:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your Spotify username and public profile information</li>
            <li>
              Your top tracks and top artists (short, medium, and long-term)
            </li>
            <li>Your recently played tracks and listening history</li>
            <li>Your playlists and saved music library</li>
            <li>Musical genre preferences and audio features</li>
            <li>Current playback status (when applicable)</li>
          </ul>
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-[#1ED760] p-4 mb-6">
            <p className="text-sm">
              <strong>Important:</strong> We never see, store, or have access to
              your Spotify password. All access is granted through secure OAuth
              2.0 authentication.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            b. Authentication & Session Data
          </h3>
          <p className="mb-4">
            To maintain your session and provide our service, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>OAuth access tokens and refresh tokens (stored securely)</li>
            <li>Session cookies for maintaining your logged-in state</li>
            <li>Browser and device information for security purposes</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            c. Usage Analytics
          </h3>
          <p className="mb-4">We may collect anonymous usage data including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Pages visited within our application</li>
            <li>Features used and interaction patterns</li>
            <li>Error logs and performance metrics</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your information solely to provide and improve our service:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Display your personalized Spotify analytics and insights</li>
            <li>
              Generate visualizations of your music taste and listening patterns
            </li>
            <li>Provide recommendations based on your musical preferences</li>
            <li>Maintain secure access to your account</li>
            <li>Improve our service quality and user experience</li>
          </ul>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-sm font-semibold">
              We do NOT sell, share, rent, or use your data for advertising,
              profiling, or any commercial purposes outside of providing our
              analytics service.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            3. Data Storage and Retention
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Session Data:</strong> Stored only during your active
              session and automatically deleted when you log out
            </li>
            <li>
              <strong>Authentication Tokens:</strong> Securely stored and
              regularly refreshed, deleted upon logout or token expiration
            </li>
            <li>
              <strong>Analytics Data:</strong> May be temporarily cached to
              improve performance, automatically purged every 24 hours
            </li>
            <li>
              <strong>No Long-term Storage:</strong> We do not maintain
              permanent databases of your personal listening data
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your
            data:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Encryption:</strong> All data transmission uses HTTPS/TLS
              encryption
            </li>
            <li>
              <strong>Secure Storage:</strong> Tokens stored in HTTP-only,
              secure cookies with appropriate flags
            </li>
            <li>
              <strong>Access Control:</strong> Limited access to user data,
              principle of least privilege
            </li>
            <li>
              <strong>Regular Updates:</strong> We keep our dependencies and
              security measures up to date
            </li>
            <li>
              <strong>No Client-side Storage:</strong> Sensitive data never
              stored in browser localStorage or client-side
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            5. Third-Party Services
          </h2>
          <p className="mb-4">
            SPAZ integrates with the following third-party services:
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Spotify Web API</h3>
          <p className="mb-4">
            Our core functionality depends on Spotify&apos;s Web API. By using
            SPAZ, you also agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <a
                href="https://developer.spotify.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ED760] hover:underline"
              >
                Spotify&apos;s Developer Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://www.spotify.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ED760] hover:underline"
              >
                Spotify&apos;s Privacy Policy
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">
            Clerk Authentication
          </h3>
          <p className="mb-4">
            We use Clerk for user authentication and session management.
            Clerk&apos;s privacy practices are governed by their own privacy
            policy.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            6. Your Rights and Choices
          </h2>
          <p className="mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Access:</strong> Request information about what data we
              have collected
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your data from our
              systems
            </li>
            <li>
              <strong>Revoke Access:</strong> Disconnect SPAZ from your Spotify
              account at any time
            </li>
            <li>
              <strong>Data Portability:</strong> Request an export of your
              analytics data
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">
            How to Exercise Your Rights:
          </h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Revoke Spotify access via{" "}
              <a
                href="https://www.spotify.com/account/apps/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ED760] hover:underline"
              >
                your Spotify account settings
              </a>
            </li>
            <li>Log out of SPAZ to immediately clear session data</li>
            <li>
              Contact us using the information provided below for other requests
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            7. Cookies and Tracking
          </h2>
          <p className="mb-4">
            We use cookies only for essential functionality:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Authentication Cookies:</strong> To maintain your
              logged-in session
            </li>
            <li>
              <strong>Security Cookies:</strong> To prevent CSRF attacks and
              ensure secure communication
            </li>
            <li>
              <strong>Preference Cookies:</strong> To remember your theme and
              language preferences
            </li>
          </ul>
          <p className="mb-6">
            We do not use tracking cookies or third-party analytics cookies.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            8. Children&apos;s Privacy
          </h2>
          <p className="mb-6">
            SPAZ is not intended for children under 13 years of age. We do not
            knowingly collect personal information from children under 13. If
            you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            9. International Data Transfers
          </h2>
          <p className="mb-6">
            Your data may be processed and stored in countries other than your
            own. We ensure appropriate safeguards are in place for any
            international data transfers in compliance with applicable data
            protection laws.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            10. Changes to This Privacy Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy periodically to reflect changes in
            our practices, technology, legal requirements, or other factors. We
            will notify you of any material changes by posting the updated
            policy on our website with a new effective date. Continued use of
            our service after such changes constitutes acceptance of the updated
            policy.
          </p>

          <h2 className="text-2xl font-semibold text-[#1ED760] mt-8 mb-4">
            11. Contact Information
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Project:</strong> SPAZ (SPotify music AnalyZer)
              </li>
              <li>
                <strong>Email:</strong> privacy@spaz-app.com
              </li>
              <li>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/TimothyMedewase/spaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1ED760] hover:underline"
                >
                  github.com/TimothyMedewase/spaz
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              This Privacy Policy is designed to be transparent and
              comprehensive. We are committed to protecting your privacy and
              handling your data responsibly.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
