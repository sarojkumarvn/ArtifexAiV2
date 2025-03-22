import React from 'react';

const HowItWorks = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-20">How It Works</h2>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 hidden md:block opacity-5"
          style={{ transform: 'translateX(-50%)' }}
        ></div>

        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center mb-24 group relative">
          <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 relative transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-200 rounded-full transform translate-x-1 translate-y-1"></div>
            </div>
          </div>
          <div className="md:w-3/4 md:pl-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sign Up for an Account</h3>
            <p className="text-gray-600 mb-4">
              Create your Artifex AI account in less than a minute. Simply provide your email address and create a password to get started.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure authentication
              </span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-24 group relative">
          <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 relative transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-200 rounded-full transform translate-x-1 translate-y-1"></div>
            </div>
          </div>
          <div className="md:w-3/4 md:pr-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Choose Your AI Solution</h3>
            <p className="text-gray-600 mb-4">
              Select from our range of AI-powered tools including image-to-text conversion, text-to-image generation, or our intelligent chatbot assistant.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Intuitive interface
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Customizable parameters
              </span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center mb-24 group relative">
          <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 relative transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-200 rounded-full transform translate-x-1 translate-y-1"></div>
            </div>
          </div>
          <div className="md:w-3/4 md:pl-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Input Your Requirements</h3>
            <p className="text-gray-600 mb-4">
              Upload an image, enter your text prompt, or start a conversation with our AI. Our system will process your input and provide results in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Multiple file formats
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Prompt optimization
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center group relative">
          <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 relative transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-200 rounded-full transform translate-x-1 translate-y-1"></div>
            </div>
          </div>
          <div className="md:w-3/4 md:pr-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Review and Download Results</h3>
            <p className="text-gray-600 mb-4">
              Review the AI-generated outputs, make adjustments if needed, and download or share your results. Our platform ensures high-quality outputs.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Multiple export options
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                <svg
                  className="h-4 w-4 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Easy sharing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-24 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-8 text-center shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your AI Experience?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Get started with Artifex AI today and discover the power of our advanced AI tools. No technical expertise required.
        </p>
        <button className="bg-white text-indigo-600 font-medium py-3 px-8 rounded-lg shadow hover:bg-gray-50 transition-all duration-300">
          Start Your Free Trial
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;