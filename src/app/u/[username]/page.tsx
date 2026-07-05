'use client';

import { motion } from 'motion/react';
import {
  MessageCircle,
  Send,
  Shield,
  Sparkles,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios'
import Image from "next/image";
import logo from '@/assets/logo.png'



const cardMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
} as const;

export default function Page() {
  const params = useParams();
  const username = decodeURIComponent(params.username as string);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const maxLength = 500;
  const [loading,setLoading]=useState(true)
  const [userExist,setUserExist]=useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
 
  const generateSuggestions = async () => {
  try {
    setLoadingSuggestions(true);

    const response = await axios.post("/api/suggest-messages");

    setSuggestions(response.data.suggestions);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message ?? "Failed to generate suggestions");
    } else {
      alert("Something went wrong");
    }
  } finally {
    setLoadingSuggestions(false);
  }
};


  const handleSendMessage=async()=>{
    
    if(!message.trim()){
      alert("message cannot be empty")
      return
    }
    setIsSending(true)
    try {
        const response=await axios.post("/api/send-message",{
      username,
      anonymousMessage:message
    });
    alert(response.data.message)
    setMessage("")
    } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(
        error.response?.data?.message ?? "No message received"
      );
        }else{
          console.error(error);
          alert("something went wrong")
        }
    }
    finally{
      setIsSending(false)
    }

  }

  useEffect(()=>{
    const validateusername=async()=>{
      try {
        const response=await axios.get("/api/usernameValidation",{
          params:{username,
          },
        })
        setUserExist(response.data.success);
        
      } catch (error) {
        setUserExist(false)
      }
      finally{
        setLoading(false)
      }
    }
    validateusername();

  },[username])
  if(loading){
    return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  );
  }
  if(!userExist){
    return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-3xl font-bold">User not found</h1>
    </div>
  );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="animate"
        className="mx-auto flex w-full max-w-[900px] flex-col gap-6"
      >
        <motion.header
          variants={cardMotion}
          className="pt-4 text-center sm:pt-8"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-950/30">
            <Image
              src={logo}
              alt="Mystery Message logo"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Send an Anonymous Feedback to @{username}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Share your thoughts honestly. Your identity will remain completely
            anonymous.
          </p>
        </motion.header>

        <motion.section
          {...cardMotion}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl shadow-black/20 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-cyan-300">
                <User className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  You are sending message to
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  @{username}
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
              Anonymous
            </span>
          </div>
        </motion.section>

        <motion.section
          {...cardMotion}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl shadow-black/20 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <Send className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-white">
              Write your message
            </h2>
          </div>

          <div className="relative">
            <textarea
            disabled={isSending}
              value={message}
              maxLength={maxLength}
              onChange={(event) => setMessage(event.target.value)}
              rows={7}
              placeholder="Write something kind, helpful, funny or honest..."
              className="min-h-44 w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-4 pb-10 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/10"
            />
            <span className="absolute bottom-3 right-4 text-xs text-zinc-500">
              {message.length}/{maxLength}
            </span>
          </div>

          <motion.button
            onClick={handleSendMessage}
            disabled={isSending}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-950/30 transition hover:from-cyan-300 hover:to-cyan-400"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {isSending ? "Sending..." : "Send Anonymous Message"}
          </motion.button>
        </motion.section>

        <motion.section
          {...cardMotion}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl shadow-black/20 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-white">
                  Need inspiration?
                </h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Generate anonymous message ideas using AI.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={generateSuggestions}
              disabled={loadingSuggestions}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/30 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/10 sm:w-auto"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {loadingSuggestions ? "Generating..." : "Generate Suggestions"}
            </motion.button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {suggestions.map((suggestion) => (
              <motion.button
                onClick={()=>setMessage(suggestion)}
                key={suggestion}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="cursor-pointer rounded-xl border border-white/10 bg-zinc-950 p-4 text-left text-sm leading-6 text-zinc-300 transition hover:border-cyan-300/50 hover:bg-cyan-400/5 hover:text-zinc-100 hover:shadow-lg hover:shadow-cyan-950/20"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.aside
          {...cardMotion}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-5 shadow-lg shadow-cyan-950/20"
        >
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-zinc-950 text-cyan-300">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                Your identity is protected
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-300">
                Messages are delivered anonymously. The recipient cannot see
                who sent them.
              </p>
            </div>
          </div>
        </motion.aside>

        <motion.footer
          variants={cardMotion}
          className="pb-3 text-center text-sm text-zinc-500"
        >
          Built with love for honest conversations.
        </motion.footer>
      </motion.div>
    </main>
  );
}
