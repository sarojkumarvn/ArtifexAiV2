import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
    
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        <div className="w-full mb-7 flex justify-between">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <Link
        to={"/"}
        
        >
        <button 
        className="btn btn-primary">Go to home</button>
        </Link>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p className="text-gray-700 mt-2">We may collect personal information, usage data, and technical information when you interact with our AI chatbot, image analysis, and image generation services.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-gray-700 mt-2">Your information is used to enhance our services, improve user experience, ensure security, and comply with legal obligations.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">3. Data Sharing & Disclosure</h2>
          <p className="text-gray-700 mt-2">We do not sell or rent your personal data but may share it with trusted service providers, legal authorities, or during business transactions.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">4. Data Security</h2>
          <p className="text-gray-700 mt-2">We implement industry-standard security measures to protect your data. However, we encourage users to take necessary precautions.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">5. Your Rights & Choices</h2>
          <p className="text-gray-700 mt-2">Depending on your location, you may have rights to access, update, or delete your data and opt-out of marketing communications.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">6. Cookies & Tracking Technologies</h2>
          <p className="text-gray-700 mt-2">We use cookies to enhance user experience. You can manage your preferences through browser settings.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">7. Third-Party Links & Content</h2>
          <p className="text-gray-700 mt-2">Our platform may contain third-party links. We are not responsible for their privacy policies.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">8. Changes to This Policy</h2>
          <p className="text-gray-700 mt-2">We may update this policy periodically. Continued use of our services constitutes acceptance of the revised policy.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">9. Contact Us</h2>
          <p className="text-gray-700 mt-2">If you have any questions, contact us at:</p>
          <p className="text-gray-700 font-medium">[Insert Contact Email]</p>
          <p className="text-gray-700 font-medium">[Insert Company Address]</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
