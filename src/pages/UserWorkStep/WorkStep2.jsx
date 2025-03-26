import React from 'react'

export const WorkStep2 = () => {
  return (
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
  )
}
