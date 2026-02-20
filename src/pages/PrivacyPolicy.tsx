import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-10 text-white bg-[#020617] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>Effective Date: February 20, 2026</p>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">1. Data Collection</h2>
        <p>We only collect your name and email address via Google/Facebook login to create your account.</p>
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">2. Data Deletion</h2>
        <p>To delete your data, please contact us at support@ourflamefoundation.vercel.app.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
