import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ScrollText } from "lucide-react";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 md:p-20">
      <Link to="/login" className="flex items-center gap-2 text-flame-orange mb-10 hover:underline">
        <ArrowLeft size={20} /> Back to Sign In
      </Link>

      <div className="max-w-3xl mx-auto bg-[#0f172a]/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-flame-orange/10 rounded-xl">
            <ScrollText className="text-flame-orange" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By accessing Our Flame Foundation, you agree to be bound by these terms. If you do not agree, please do not use our services or social SSO logins.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Data & Privacy</h2>
            <p>We use Supabase and OAuth (X, Google, Discord) to authenticate you. We only access your public profile (name, avatar, handle). We do not store your passwords or sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Community Standards</h2>
            <p>The "Flame" community is built on support. Users engaging in harassment, hate speech, or malicious behavior will have their access revoked immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Limitation of Liability</h2>
            <p>Our Flame Foundation is provided "as is." While we strive for 100% uptime, we are not responsible for data loss or service interruptions during our beta phase.</p>
          </section>

          <footer className="pt-10 border-t border-slate-800 text-slate-500">
            Last Updated: February 2026
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
