"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router=useRouter()
  const session=useSession()
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  console.log(session.data?.user);


  const handleSignInForm=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result= await signIn('credentials',{email,password,redirect:false})
      
      if(result?.error){
                  alert("incorrect email or password");
                  
                  return
                }
                  alert("signIn sucessfully");
                router.replace("/dashboard")
                
     
      
    } catch (error) {
     console.error(error);
  alert("Something went wrong.");
      
    }
    finally{
      setLoading(false)
    }

  }

  return (
    <main className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Sign in to continue to Mystery Message.
            </p>
          </div>

          <form
          onSubmit={handleSignInForm} 
          className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <motion.input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <motion.input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-12 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-4 flex items-center text-zinc-500 transition hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

          

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
              {loading ? (
    <>
      <ClipLoader
        size={18}
        color="#ffffff"
        speedMultiplier={0.9}
      />
      Signing In...
    </>
  ) : (
    "Sign In"
  )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}