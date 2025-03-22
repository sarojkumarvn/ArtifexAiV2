import React from "react";
import { featurecard } from "../constant/CardConstant";
import {  useNavigate } from "react-router-dom";

const Features = () => {
const Navigate = useNavigate();
  return (
    <div>
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4" id="el-7tbt2axr">
          <h2
            className="text-4xl font-bold text-gray-800 text-center mb-12"
            id="el-xc90ug4n"
          >
            Powerful Features
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            id="el-r5eqj10o"
          >
            {/* Feature Card 1 */}
            {featurecard.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                id="el-bhrg3u1v"
              >
                <div
                  className="h-16 w-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4"
                  id="el-3qk9swce"
                >
                  {card.icon}
                </div>
                <h3
                  className="text-2xl font-semibold text-gray-800 mb-4"
                  id="el-zg703ys9"
                >
                  {card.title}
                </h3>
                <p className="text-gray-500 mb-6" id="el-voanb6be">
                  {card.description}
                </p>
                <div className="flex justify-end" id="el-4xp5zvak">
                  <button
                  onClick={()=> Navigate(card.path)}
                    className={`bg-indigo-600 text-white font-medium py-3 px-6 rounded hover:scale-105 hover:shadow transition-all duration-300`}
                    id="el-lu18mzr9"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
