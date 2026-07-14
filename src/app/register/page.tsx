"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

            <div className="flex items-center gap-3" aria-hidden="true">
              <div className="h-px flex-1 bg-zinc-700" />
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                or
              </span>
              <div className="h-px flex-1 bg-zinc-700" />
            </div>

            <motion.button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 py-3 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.14c1.84-1.69 2.91-4.18 2.91-7.28Z" />
                <path fill="#34A853" d="M12 21.75c2.63 0 4.83-.87 6.44-2.35l-3.14-2.51c-.87.58-1.99.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.59A9.75 9.75 0 0 0 12 21.75Z" />
                <path fill="#FBBC05" d="M6.54 13.78A5.87 5.87 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.37l3.24-2.59Z" />
                <path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.82 3.27 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.38l3.24 2.59C7.31 7.91 9.46 6.19 12 6.19Z" />
              </svg>
              Sign up with Google
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
