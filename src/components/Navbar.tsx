'use client'
import { LogOut, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface navbarProps{
  username:string
}
function Navbar({username}:navbarProps) {
  return (
    <nav className="border-b border-white/10 bg-zinc-950/95 text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white">
            <Image
              src="/globe.svg"
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
