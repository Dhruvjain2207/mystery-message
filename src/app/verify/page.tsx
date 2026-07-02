"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router=useRouter()
  const searchParams=useSearchParams()
  const email=searchParams.get("email")
  const[otp,setOtp]=useState("")
  const[loading,setLoading]=useState(false)

  const handleVerifyForm=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if (!email) {
  alert("Invalid verification link.");
  return;
}
    
    setLoading(true)
    try {
     const response = await axios.post(
    "/api/verifyotp",
    {
      code: otp,
    },
    {
      params: {
        email,
      },
    }
  );
  alert(response.data.message)
  router.replace("/login")
    

    } catch (error) {
      if (axios.isAxiosError(error)) {
    console.log(error.response);
    console.log(error.response?.data);

    alert(error.response?.data?.message ?? "No message received");
  } else {
    console.log(error);
  }
      
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
              Verify Your Email
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Enter the 6-digit verification code sent to your email.
            </p>
          </div>

          <form 
          onSubmit={handleVerifyForm}
          className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Verification Code
              </label>

              <motion.input
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-center text-xl tracking-[0.5em] text-white placeholder:tracking-normal placeholder:text-base placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            <motion.button
              disabled={loading}
              type="submit"
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
      Verifying...
    </>
  ) : (
    "Verify OTP"
  )}
            </motion.button>
          </form>

          {/* Note */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
            <p className="text-center text-sm text-zinc-400">
              Didn't receive the verification code?
            </p>

            <p className="mt-1 text-center text-sm text-zinc-500">
              Please try registering again to receive a new verification code.
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Back to{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}