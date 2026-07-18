'use client'
import React, { useState } from 'react'
import { AtSign, Pencil } from "lucide-react";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Editusernameform({propusername}:any) {
    const router=useRouter()
    const {update}=useSession()
      const [newusername,setnewusername]=useState("");
    const handleSubmit=async(event:React.FormEvent)=>{
         event.preventDefault()
        try{
            const res=await axios.patch("/api/updateUsername",{
                newusername
            })
           alert(res.data.message);
           if(res.data.success){
            await update({
                username:newusername
            })
            router.push("/dashboard")


           }
           
           
        }catch(error){
               if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) {
      alert("Username already taken");
      return;
    }
  }

  alert("Something went wrong");
        }
    }
  return (
       <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10 text-white sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-zinc-950">
          <Pencil className="h-5 w-5" />
        </div>

        <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          Profile settings
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Edit username
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Choose a username that people can use to send you anonymous messages.
        </p>

        <form
         onSubmit={handleSubmit}
        
         className="mt-7 space-y-5">
          <p className="text-sm text-zinc-300">
            Your current username is: {propusername}
          </p>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-200"
              
            >
              New username
            </label>
            <div className="flex items-center rounded-lg border border-white/10 bg-zinc-950 px-3 transition focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/20">
              <AtSign className="h-5 w-5 shrink-0 text-zinc-500" />
              <input
                value={newusername}
                onChange={(e)=>setnewusername(e.target.value)}
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              This will update your public feedback link.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200"
          >
            <Pencil className="h-4 w-4" />
            Confirm changes
          </button>
        </form>
      </section>
    </main>
  )
}

export default Editusernameform