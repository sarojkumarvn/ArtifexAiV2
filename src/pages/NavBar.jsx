import React from 'react'
import { Link } from "react-router-dom";
import  SignIn from "../_auth/SignIn";
import SignUp from '../_auth/SignUp';


export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 text-white text-2xl font-bold w-10 h-10 rounded flex items-center justify-center">
            A
          </div>
          <span className="text-2xl font-bold text-gray-900">Artifex AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignIn />
          <SignUp />
        
         
        </div>
      </nav>
  )
}
