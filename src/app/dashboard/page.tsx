'use client'
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import axios from "axios";
import { Copy, MessageCircle, Send, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function page() {
  interface Message {
  _id: string;
  content: string;
  createdAt: string;
}


  const session=useSession()
  const shareurl=`http://localhost:3000/u/${session?.data?.user?.username}`
  const [copied,setCopied]=useState(false)
  const [shared,setShared]=useState(false)
  const [messages,setMessages]=useState<Message[]>([])
  const [deleting,setDeleting]=useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null);


 const handleDelete = async (messageId: string) => {
  try {
     setDeletingId(messageId);
    setDeleting(true);

    const response = await axios.delete("/api/delete-message", {
      data: {
        messageId,
      },
    });

    

    setMessages((prev) =>
      prev.filter((message) => message._id !== messageId)
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message ?? "No message received");
    } else {
      console.error(error);
      alert("Something went wrong");
    }
  } finally {
    setDeleting(false);
  }
};

  const fetchMessages=async()=>{
    try {
      const response=await axios.get("/api/get-messages");
      if(response.data.success){
        setMessages(response.data.messages)
      }
      
    } catch (error:any) {
      console.error("Error fetching messages:", error);
      alert(error.response?.data?.message || "Failed to fetch messages");
      
    }
  }
  useEffect(()=>{
    fetchMessages();
  },[])



  const handleCopy=async()=>{
    await navigator.clipboard.writeText(shareurl)
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    },2000)

  }

  const handleShare=async()=>{
    const messageLink=shareurl
    if(navigator.share){
      try{
        await navigator.share({
          title:"Mystery Message",
          text:"Send me an anonymous message!",
          url:messageLink
        });
      }catch(error){
        console.log("Share Cancelled",error)

      }
    }
    else{
      await navigator.clipboard.writeText(messageLink);
      alert("Link Copied")
    }
  }
  
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar username={session.data?.user?.username ?? ""} />

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Welcome back, {session?.data?.user?.username}
          </h1>
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-900 p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Send className="h-5 w-5 text-cyan-300" />
                <span>Your Feedback Link</span>
              
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Share it anywhere and start receiving anonymous messages.
              </p>
              <p className="mt-3 break-all text-zinc-300">
                 {shareurl}
              </p>
            </div>

            <div className="flex gap-3">
              <button
              onClick={handleCopy}
               className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10">
                <Copy className="h-4 w-4" />
                {copied ? "Copied":"Copy"}
              </button>
              <button
              onClick={handleShare} 
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200">
                <Send className="h-4 w-4" />
                {shared ? "Shared!":"Share"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-zinc-900 p-5">
          <p className="font-medium text-zinc-100">Accept Anonymous Messages</p>
          <button
            aria-label="Toggle anonymous messages"
            className="flex h-7 w-12 items-center rounded-full bg-cyan-300 p-1 transition"
          >
            <span className="h-5 w-5 rounded-full bg-zinc-950 shadow-lg" />
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Recent Messages</h2>

          <div className="mt-4 grid gap-4">
           {messages.length === 0 ? (
  <div className="rounded-lg border border-white/10 bg-zinc-900 p-5 text-center text-zinc-400">
    No messages yet.
  </div>
) : (
  messages.map((message) => (
    <article
      key={message._id}
      className="rounded-lg border border-white/10 bg-zinc-900 p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <MessageCircle className="mt-1 h-5 w-5 text-cyan-300" />

          <div>
            <p className="text-zinc-100">{message.content}</p>

            <p className="mt-2 text-sm text-zinc-400">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <button 
        onClick={()=>handleDelete(message._id)}
        disabled={deletingId === message._id}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/10">
          <Trash2 className="h-4 w-4" />
          {deletingId === message._id ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  ))
)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
