import React from 'react';
import { Mail, MapPin, ShieldAlert } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 md:p-16 text-zinc-300 bg-[#020617] min-h-screen font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto bg-black/40 border border-zinc-900 p-8 md:p-12 shadow-2xl">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
            MAGIC WORLD - <span className="text-orange-600 not-italic">PRIVACY POLICY</span>
          </h1>
          <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">
            Global Hybrid Version | Created: February 26th, 2025 | Last Updated: October 26, 2023
          </p>
        </div>

        {/* INTRODUCTION */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">Introduction</h2>
          <p className="text-sm text-zinc-400">
            MAGIC WORLD ("Company," "we," "us," "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website https://play2-magic-worlds.vercel.app/, use our game application ("Magic World"), or engage with any of our related services (collectively, the "Services").
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            This Privacy Policy is designed to comply with international data protection standards, including the UK General Data Protection Regulation (UK GDPR), EU GDPR, Data Protection Act 2018, and other applicable data protection laws.
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            By accessing or using our Services, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please do not use our Services. Please review our Terms and Conditions for more information about your legal obligations when using our Services.
          </p>
        </section>

        {/* 1. INFORMATION WE COLLECT */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">1. Information We Collect</h2>
          <p className="text-sm mb-4">We collect various types of personal data to enhance user experience and ensure compliance with regulations.</p>
          
          <div className="space-y-6 pl-4 border-l-2 border-zinc-800">
            <div>
              <h3 className="text-orange-600 font-bold text-xs uppercase mb-2">A. Personal Information Provided by You</h3>
              <p className="text-sm"><strong>Account Information:</strong> Name, email, username, password</p>
              <p className="text-sm"><strong>Payment Data:</strong> Billing address, payment methods (processed through third-party payment processors)</p>
              <p className="text-sm"><strong>Communication Data:</strong> Emails, feedback, and support inquiries</p>
              <p className="text-sm"><strong>KYC/AML Data:</strong> Government-issued ID, proof of address, photographic verification (for compliance purposes)</p>
            </div>
            <div>
              <h3 className="text-orange-600 font-bold text-xs uppercase mb-2">B. Automatically Collected Information</h3>
              <p className="text-sm"><strong>Device & Usage Data:</strong> IP address, browser type, operating system, game activity logs</p>
              <p className="text-sm"><strong>Cookies & Tracking Technologies:</strong> Website behaviour, preferences, session data (see our Cookie Policy for details)</p>
            </div>
            <div>
              <h3 className="text-orange-600 font-bold text-xs uppercase mb-2">C. Blockchain & Cryptocurrency Data</h3>
              <p className="text-sm"><strong>Public Blockchain Information:</strong> Wallet address, in-game token transactions, NFT ownership records (Note: Blockchain transactions are immutable and public by nature)</p>
              <p className="text-sm"><strong>Smart Contracts:</strong> Data related to blockchain-based in-game assets</p>
            </div>
            <div>
              <h3 className="text-orange-600 font-bold text-xs uppercase mb-2">D. AI-Generated Data</h3>
              <p className="text-sm"><strong>In-Game AI Interactions:</strong> Chatbot conversations, AI-generated content, preferences, behavioral insights</p>
              <p className="text-sm"><strong>AI Moderation & Compliance:</strong> Automated flagging of suspicious activity</p>
            </div>
          </div>
        </section>

        {/* 2. HOW WE USE YOUR DATA */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">2. How We Use Your Data</h2>
          <p className="text-sm mb-4">We process your personal data based on the following lawful bases under UK GDPR:</p>
          <div className="bg-zinc-900 border border-zinc-800 text-xs">
             <div className="grid grid-cols-2 border-b border-zinc-800 font-black p-3 bg-zinc-800/50 text-orange-600">
                <span>Purpose</span>
                <span>Lawful Basis</span>
             </div>
             {[
               ["To provide and manage game services", "Performance of contract"],
               ["To process payments and transactions", "Legal obligation"],
               ["To prevent fraud and ensure security", "Legitimate interest"],
               ["To comply with KYC/AML regulations", "Legal obligation"],
               ["To personalize user experience", "Consent"],
               ["To send marketing communications", "Consent (opt-in required)"],
               ["To comply with legal obligations", "Legal obligation"]
             ].map(([p, l], i) => (
               <div key={i} className="grid grid-cols-2 p-3 border-b border-zinc-800 last:border-0">
                  <span>{p}</span>
                  <span className="italic">{l}</span>
               </div>
             ))}
          </div>
        </section>

        {/* 3. DATA SHARING */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">3. Data Sharing & Third-Party Disclosure</h2>
          <p className="text-sm mb-4">We may share your personal data with:</p>
          <ul className="list-disc pl-8 text-sm space-y-2 text-zinc-400">
            <li><strong>Payment Processors:</strong> To handle transactions securely (e.g., Stripe, PayPal)</li>
            <li><strong>KYC/AML Verification Services:</strong> For identity verification and compliance screening</li>
            <li><strong>Blockchain Networks:</strong> Public ledgers (your wallet address and transactions may be visible)</li>
            <li><strong>AI & Cloud Services:</strong> Hosting, AI content processing, and security monitoring</li>
            <li><strong>Regulatory Authorities:</strong> Compliance with legal obligations (AML/KYC regulations)</li>
            <li><strong>Law Enforcement:</strong> When required by law, subpoena, or legal process</li>
          </ul>
          <p className="text-sm mt-4 font-bold text-white uppercase italic">We do not sell or rent your personal data to third parties for marketing purposes.</p>
        </section>

        {/* 4. USER RIGHTS */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">4. User Rights Under UK GDPR</h2>
          <p className="text-sm mb-4">As a user, you have the following rights:</p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            {["Right to Access: Request a copy of your personal data", 
              "Right to Rectification: Correct inaccurate information",
              "Right to Erasure: Request deletion of your data (subject to blockchain limitations)",
              "Right to Restrict Processing: Limit how we process your data",
              "Right to Data Portability: Request transfer of your data",
              "Right to Object: Opt out of direct marketing",
              "Right to Withdraw Consent: Withdraw previously given consent"
            ].map(right => (
              <div key={right} className="p-3 bg-zinc-900 border-l-2 border-orange-600 uppercase">{right}</div>
            ))}
          </div>
          <p className="text-sm mt-4 italic text-zinc-500 text-center">To exercise your rights, contact us at magicworldsonline2025@gmail.com.</p>
        </section>

        {/* 5. BLOCKCHAIN & AI */}
        <section className="mb-10 bg-orange-600/5 p-6 border border-orange-600/20">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider flex items-center gap-2">
            <ShieldAlert size={18} className="text-orange-600"/>
            5. Blockchain, AI, & Privacy Limitations
          </h2>
          <p className="text-sm mb-4 italic text-orange-600">Due to the decentralized nature of blockchain and AI technologies, certain privacy limitations apply:</p>
          <ul className="list-disc pl-6 text-sm space-y-2">
            <li><strong>Blockchain Transactions Are Permanent:</strong> Once recorded, they cannot be altered or erased.</li>
            <li><strong>AI-Generated Content May Be Retained:</strong> Data used to train AI models may persist unless manually deleted.</li>
            <li><strong>KYC Data Retention:</strong> We are required by law to retain KYC/AML data for minimum periods (typically 5-7 years)</li>
          </ul>
          <p className="text-sm mt-4">We take security measures to minimize risks, including encryption, anonymization, and smart contract audits.</p>
          <p className="text-sm mt-2"><strong>5.1. Off-Chain Personal Data:</strong> All personally identifiable information (e.g., email, KYC documents, payment details) is stored off-chain in encrypted databases. Only pseudonymous wallet addresses and transaction hashes are recorded on-chain.</p>
        </section>

        {/* 6, 7, 8, 9 */}
        {[
          ["6. Data Security & Retention", "We implement industry-standard security measures, including End-to-End Encryption, MFA, Regular Smart Contract Audits, and Secure KYC Storage. We retain personal data only for as long as necessary for legal and operational purposes. KYC data is retained as required by anti-money laundering regulations."],
          ["7. International Data Transfers", "If we transfer personal data outside the UK/EU, we ensure: Adequate Data Protection Agreements (SCCs), Encryption & Secure Transfers, and additional safeguards for transfers to the United States."],
          ["8. Children's Privacy", "We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers."],
          ["9. Changes to this Privacy Policy", "We may update this Privacy Policy periodically. We will notify users of significant changes through email or platform notices."]
        ].map(([title, text]) => (
          <section key={title} className="mb-10">
            <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">{title}</h2>
            <p className="text-sm text-zinc-400">{text}</p>
          </section>
        ))}

        {/* 10. JURISDICTIONAL ADDENDUMS */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase mb-4 tracking-wider underline decoration-orange-600 underline-offset-8">10. Jurisdictional Addendums</h2>
          <p className="text-sm mb-6">The following addendums form an integral part of this Privacy Policy and provide additional rights for users in specific jurisdictions.</p>
          
          <div className="space-y-8 bg-zinc-900/40 p-6">
            <div>
              <h3 className="text-orange-600 font-bold mb-4 uppercase tracking-widest text-sm">ADDENDUM A: UNITED STATES PRIVACY RIGHTS</h3>
              <div className="space-y-4 text-xs">
                <p><strong>A.1. California Privacy Rights (CCPA/CPRA):</strong> Residents have the right to Know, Request deletion, Correct inaccuracy, Opt-out of sale/sharing, and Limit use of sensitive data. Contact us at magicworldsonline2025@gmail.com.</p>
                <p><strong>A.2. Nevada Privacy Rights:</strong> Residents may opt out of the sale of certain personal information. We do not currently sell personal information as defined under Nevada law.</p>
                <p><strong>A.3. Colorado, Virginia, Utah, and Connecticut:</strong> Residents have rights similar to California residents, including targeted advertising opt-outs.</p>
                <p><strong>A.4. Financial Data Privacy:</strong> We comply with GLBA for financial information collected during payment processing.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-orange-600 font-bold mb-4 uppercase tracking-widest text-sm">ADDENDUM B: OTHER INTERNATIONAL PRIVACY RIGHTS</h3>
              <div className="space-y-4 text-xs">
                <p><strong>B.1. EEA & UK:</strong> Your GDPR rights are outlined in Section 4. Our Data Protection Representative is at magicworldsonline2025@gmail.com.</p>
                <p><strong>B.2. Brazil (LGPD):</strong> Residents have rights including confirmation of processing, access, and anonymization.</p>
                <p><strong>B.3. Canada (PIPEDA):</strong> Residents have the right to access, correct, and withdraw consent.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. CONTACT US */}
        <section className="mt-20 p-8 bg-zinc-900 border-t-4 border-orange-600 text-center">
          <h2 className="text-white font-black uppercase italic text-2xl mb-8">11. Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-sm">
             <a href="mailto:magicworldsonline2025@gmail.com" className="flex items-center gap-2 hover:text-orange-600 transition-all">
                <Mail size={16} className="text-orange-600"/> magicworldsonline2025@gmail.com
             </a>
             <span className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-600"/> Hackney, London, E9 7DB, UK
             </span>
          </div>
          <p className="mt-8 text-[10px] text-zinc-600 uppercase font-black tracking-[0.4em]">Effective: February 26, 2025</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
