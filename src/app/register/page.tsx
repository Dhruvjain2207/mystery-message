"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router=useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)


  const handleRegisterForm=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const response=await axios.post("/api/register",{
        username,
        email,
        password
      })
      alert(response.data.message)
      router.push(`/verify?email=${encodeURIComponent(email)}`);
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>

            <p className="mt-2 text-sm text-zinc-400">
              Join Mystery Message and start receiving anonymous messages.
            </p>
          </div>

          <form 
          onSubmit={handleRegisterForm}
          className="space-y-5">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Username
              </label>

              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="dhruvjain"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-20 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <motion.button
            type="submit"
            disabled={loading}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
               {loading ? (
    <>
      <ClipLoader size={20} color="#ffffff" />
      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
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
