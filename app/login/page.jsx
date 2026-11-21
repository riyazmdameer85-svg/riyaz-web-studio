"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const supabase = supabaseBrowser();

  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else router.push("/dashboard");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="text-slate-400 text-center text-sm mt-1">Log in to Riyaz Web Studio</p>

        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          <button disabled={loading} className="w-full bg-sky-500 hover:bg-sky-400 py-3 rounded-lg font-bold disabled:opacity-50">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {msg && <p className="text-red-400 text-sm mt-3 text-center">{msg}</p>}
        <p className="text-center text-slate-400 text-sm mt-6">
          No account? <Link href="/signup" className="text-sky-400 font-semibold">Sign up</Link>
        </p>
        <p className="text-center text-slate-600 text-xs mt-6">Developed by Mohammed Riyazuddin</p>
      </div>
    </main>
  );
}
