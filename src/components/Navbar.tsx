'use client'
import { LogOut, Pencil, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import logo from '@/assets/logo.png'
import axios from "axios";
import { useRouter } from "next/navigation";

interface navbarProps{
  username:string
}
function Navbar({username}:navbarProps) {
  const router=useRouter()
  const handleDelete= async()=>{
    try{
      const response=await axios.delete("/api/delete-account");
      alert(response.data.message);
      await signOut({ callbackUrl: "/login" });
    }catch(error){
      console.error("error in deleting account");
    }

  }
  return (
    <nav className="border-b border-white/10 bg-zinc-950/95 text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white">
            <Image
              src={logo}
              alt="Mystery Message logo"
              width={24}
              height={24}
            />
          </div>
          <span className="text-lg font-semibold tracking-wide">
            Mystery Message
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 sm:flex">
            <UserCircle className="h-4 w-4" />
            <span>Welcome {username}</span>
          </div>

          <button
          onClick={()=>router.push("/EditUsername")}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            <Pencil className="h-4 w-4" />
            Edit username
          </button>

          <button
            onClick={handleDelete}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
          >
            Delete Account
          </button>

          <button 
          type="button"
          onClick={()=>signOut({callbackUrl:"/login"})}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
