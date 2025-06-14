import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import AuthImagePattern from '../components/AuthImagePattern';
import { Code, Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigninUp, setIsSigninUp] = useState(false);

  return (
    <div className='h-screen grid lg:grid-cols-2'>

        <div className='w-full max-w-md space-y-8 mt-10'>

          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2'>
              <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                <Code className='w-6 h-6 text-primary' />
              </div>

              <h1 className="text-2xl font-bold mt-2">Welcome</h1>
              <p className="text-base-content/60">Sign Up to your account</p>
            </div>
          </div>

          {/* Form */}
          <form className='space-y-6'>

            {/* name */}
            <div className='flex flex-col gap-1'>
              <label className='label'>
                <span className='label-text font-medium'>Name</span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Code className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"

                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10`}
                  name=""
                  placeholder='John Doe'
                />
              </div>
            </div>

            {/* email */}
            <div className='flex flex-col gap-1'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10`}
                  name=""
                  placeholder='you@example.com'
                />
              </div>
            </div>

            {/* password */}
            <div className='flex flex-col gap-1'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10`}
                  name=""
                  placeholder='*******'
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer'>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 hover:text-gray-300" />
                  )}
                </button>

              </div>
            </div>

            {/* submit button */}
            <button type='submit' className='btn btn-primary w-full' disabled={isSigninUp}>
              {isSigninUp ? (
                <>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have a account? {" "}
              <Link to='/login' className='link link-primary'>
                Log in
              </Link>
            </p>
          </div>

        </div>

          <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={"Sign up to access our platform and start using our services."}
          />
      {/* </div> */}

    </div>
  )
}

export default SignUpPage