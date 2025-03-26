import React, { useState } from "react";
import { plans } from "../constant/PricingCardConst";

const Pricing = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_kJpSEay4QVdT5N", // Enter the Key ID generated from the Dashboard
      amount: "1000",
      currency: "USD",
      description: "Artifex Ai",
      image: "example.com/image/rzp.jpg",
      prefill: {
        email: "sarojweb2457@gmail.com",
        contact: "824***12**",
      },
      theme: {
        color: "#4f46e5",
        backdrop_color: "#00000080",
      },
      config: {
        display: {
          blocks: {
            utib: {
              name: "Pay Using Axis Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["UTIB"],
                },
                {
                  method: "netbanking",
                  banks: ["UTIB"],
                },
              ],
            },
            other: {
              //  name for other block
              name: "Other Payment Methods",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"],
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          hide: [
            {
              method: "upi",
            },
          ],
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false, // Should Checkout show its default blocks?
          },
        },
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          if (confirm("Are you sure, you want to close the form?")) {
            console.log("Checkout form closed by the user");
            setIsPaymentModalOpen(false);
            document.body.style.overflow = 'auto';
          } else {
            console.log("Complete the Payment");
          }
        },
      },
    };

    const rzp1 = new window.Razorpay(options);

    // Prevent body scrolling when payment modal is open
    document.body.style.overflow = 'hidden';
    setIsPaymentModalOpen(true);

    setTimeout(() => {
      const modalFrame = document.querySelector(
        "iframe[title='Secure Payment Form']"
      );
      if (modalFrame) {
        modalFrame.style.transform = "scale(0.85)"; // Adjust the scale to make it smaller
        modalFrame.style.transformOrigin = "center";
      }
    }, 500);

    rzp1.open();

    // Cleanup function to restore body scrolling
    rzp1.on('payment.failed', () => {
      document.body.style.overflow = 'auto';
      setIsPaymentModalOpen(false);
    });
  };

  return (
    
    
    <div className="overflow-x-hidden">
    <div 
      className={`container mx-auto px-4 py-20 ${isPaymentModalOpen ? 'overflow-hidden' : ''}`}
      style={{ 
        overscrollBehavior: 'none',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}
      >
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
                onClick={handlePayment}
                id="rzp-button1"
                className={`bg-indigo-600 text-white font-medium py-3 px-6 rounded hover:scale-105 hover:shadow 
                  transition-all duration-300 w-full ${
                    index === 1 ? "mb-3" : ""
                  }`}
                  >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
                
  </div>
  );
};

export default Pricing;