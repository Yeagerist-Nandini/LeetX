import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern';
import { 
  Code, 
  Eye, 
  EyeOff,
  Mail, 
  Lock, 
  Loader2 
} from 'lucide-react'

import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'

const SignUpSchema = z.object({
  email: z
  .string()
  .trim()
  .email({message: "Enter a valid email"}),
  password: z
  .string()
  .trim()
  .min(6, {message: "Password must be of atleast 6 chars"})
  .max(20, "Password cannot exceed 20 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    "Password must contain 1 special char, 1 number, 1 uppercase letter and 1 lowercase letter"
  ),
  name: z
  .string()
  .trim()
  .min(3, {message: "Name must be atleast 3 characters"})
  .max(20, { message: "Name cannot exceed 20 characters"})
})

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigninUp, setIsSigninUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver:zodResolver(SignUpSchema)
  })

  const onSubmit = (data) => {
    console.log(data);
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

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

                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10 ${errors.name ? "input-error": ""}`}
                  {...register("name")}
                  placeholder='John Doe'
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
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
                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10 ${errors.email ? "input-error": ""}`}
                  {...register("email")}
                  placeholder='you@example.com'
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
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
                  className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10 ${errors.password ? "input-error": ""}`}
                  {...register("password")}
                  placeholder='*******'
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}                
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 hover:text-gray-300" />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
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
                Sign in
              </Link>
            </p>
          </div>

        </div>

          <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={"Sign up to access our platform and start using our services."}
          />

    </div>
  )
}

export default SignUpPage