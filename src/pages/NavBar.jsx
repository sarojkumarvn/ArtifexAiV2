import React, { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export const NavBar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const nav = document.querySelector("nav");

      if (nav) {
        nav.style.transform = currentScroll > lastScrollTop ? "translateY(-100%)" : "translateY(0)";
      }
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md transition-transform duration-300 flex justify-between items-center p-6 w-[100%] z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 ml-10">
        <div className="bg-blue-500 text-white text-2xl font-bold w-10 h-10 rounded flex items-center justify-center">
          A
        </div>
        <span className="text-2xl font-bold text-gray-900">Artifex AI</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 mr-42">
        <button onClick={() => scrollToSection("home")} className="text-gray-600 hover:text-gray-900" aria-label="Go to Home">
          Home
        </button>
        <button onClick={() => scrollToSection("features")} className="text-gray-600 hover:text-gray-900" aria-label="Go to Features">
          Features
        </button>
        <button onClick={() => scrollToSection("pricing")} className="text-gray-600 hover:text-gray-900" aria-label="Go to Pricing">
          Pricing
        </button>
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <div className="bg-blue-500 text-white px-4 py-2 rounded">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="w-10 rounded">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
