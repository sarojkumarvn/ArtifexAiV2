import React from 'react'

export const WorkStep1 = () => {
  return (
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
  )
}
