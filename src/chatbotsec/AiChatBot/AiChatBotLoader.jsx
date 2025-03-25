import { useState, useEffect } from 'react';

const AIChatbotLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion after 1 second to match progress bar
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-500/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* AI-themed animated logo/icon */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin duration-1000 opacity-70"></div>
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="flex items-center space-x-1 text-black dark:text-black">
          <span>Loading</span>
          <span className="flex space-x-1">
            {[1, 2, 3].map((dot) => (
              <span
                key={dot}
                className="inline-block w-2 h-2 rounded-full bg-indigo-700 dark:bg-indigo-800"
                style={{
                  animation: `bounce 1.4s infinite ${dot * 0.2}s`,
                }}
              ></span>
            ))}
          </span>
        </div>

        {/* Faster progress bar (1 second duration) */}
        <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{
              width: '0%',
              animation: 'progress 1s ease-in-out forwards'
            }}
          ></div>
        </div>
      </div>

      {/* Add these styles to your global CSS */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AIChatbotLoader;