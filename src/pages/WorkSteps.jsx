import React from "react";
import { WorkStep1 } from "./UserWorkStep/WorkStep1";
import { WorkStep2 } from "./UserWorkStep/WorkStep2";
import { WorkStep3 } from "./UserWorkStep/WorkStep3";
import { WorkStep4 } from "./UserWorkStep/WorkStep4";

const HowItWorks = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-20">
        How It Works
      </h2>

      <div className="max-w-5xl mx-auto relative">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 hidden md:block opacity-5"
          style={{ transform: "translateX(-50%)" }}
        ></div>

        <WorkStep1 />

        <WorkStep2 />
        <WorkStep3 />
        <WorkStep4 />
      </div>

      {/* CTA Banner */}
      <div className="mt-24 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-8 text-center shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your AI Experience?
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Get started with Artifex AI today and discover the power of our
          advanced AI tools. No technical expertise required.
        </p>
        <button className="bg-white text-indigo-600 font-medium py-3 px-8 rounded-lg shadow hover:bg-gray-50 transition-all duration-300">
          Start Your Free Trial
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
