
import React from 'react'
import { Link } from 'react-router-dom'
 const SignIn= () => {
  return (
    <div>
          <Link
            to="/signin"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign In
          </Link>
        
    </div>
  )
}

export default SignIn;
