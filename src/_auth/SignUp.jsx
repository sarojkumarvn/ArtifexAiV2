import React from "react";
import { Link } from "react-router-dom";

 const SignUp = () => {
  return (
    <div>
      <Link
        to="/signup"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignUp;
