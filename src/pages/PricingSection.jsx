import React from "react";
import { plans } from "../constant/PricingCardConst";

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Simple Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 hover:shadow-md transition-shadow relative 
              flex flex-col justify-between  
              ${
                index === 1
                  ? "scale-105 border border-blue-400"
                  : "opacity-50 pointer-events-none border border-gray-300"
              }
            `}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-5xl font-bold text-gray-800 mb-6">
                {plan.price}
              </p>
              <p className="text-gray-500 mb-6">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-indigo-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Ensure button is always aligned at the bottom of each card */}
            <div className="mt-auto flex justify-center">
              <button
                className={`bg-indigo-600 text-white font-medium py-3 px-6 rounded hover:scale-105 hover:shadow 
                transition-all duration-300 w-full ${index===1 ? "mb-3" : ""}`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
