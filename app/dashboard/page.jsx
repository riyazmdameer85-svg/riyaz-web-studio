"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase";

export default function Dashboard() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const supabase = supabaseBrowser();

  async function load() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setEmail(user.email);

    const res = await fetch("/api/sites");
    const data = await res.json();
    setSites(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm("Delete this site permanently?")) return;
    await fetch("/api/sites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="bg-slate-900 text-white flex flex-wrap gap-3 justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">Riyaz Web Studio</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:inline">{email}</span>
          <Link href="/create" className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-lg text-sm font-bold">+ New Site</Link>
          <button onClick={logout} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm">Logout</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {loading ? (
          <p className="text-slate-500">Loading your sites...</p>
        ) : sites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">You haven't created any sites yet.</p>
            <Link href="/create" className="inline-block mt-4 bg-sky-600 text-white px-6 py-3 rounded-lg font-bold">Create your first site</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-lg">{s.business_name}</h3>
                <p className="text-sm text-slate-500 capitalize">{s.industry}</p>
                <p className="text-xs text-slate-400 mt-2">/site/{s.slug}</p>
                <p className="text-xs text-slate-400">{new Date(s.created_at).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-4">
                  <a href={`/site/${s.slug}`} target="_blank" className="flex-1 text-center bg-sky-600 text-white py-2 rounded-lg text-sm font-semibold">View</a>
                  <button onClick={() => remove(s.id)} className="bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-semibold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="text-center py-8 text-slate-500 text-sm">
        Developed by <span className="font-semibold text-slate-700">Mohammed Riyazuddin</span>
      </footer>
    </main>
  );
}
