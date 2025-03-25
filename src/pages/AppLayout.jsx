import { SignInButton, useAuth } from "@clerk/clerk-react";
import React from "react";
import { Outlet } from "react-router-dom";
import AIChatbotLoader from "../chatbotsec/AiChatBot/AiChatBotLoader";

export const AppLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return (
      <div>
        <AIChatbotLoader />
      </div>
    );
  }
  if (!isSignedIn)
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2 animate-pulse">
              Artifex AI
            </h1>
            <p className="text-gray-600 mb-6">
              You are currently not signed in
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-dashed border-blue-200 animate-fade-in">
            <p className="text-sm text-gray-700">
              Sign in to access all features and personalize your experience
            </p>
          </div>

          <div className="relative z-10 bg-blue-500 text-white px-4 py-2 rounded"> 
            <SignInButton />
          </div>
        </div>
      </div>
    );
  return (
    <>
      <Outlet />
    </>
  );
};