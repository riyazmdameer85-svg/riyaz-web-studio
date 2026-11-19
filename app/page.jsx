import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">Riyaz Web Studio</h1>
        <div className="flex gap-3">
          <Link href="/dashboard" className="px-5 py-2 rounded-lg font-semibold hover:bg-slate-800">Dashboard</Link>
          <Link href="/login" className="px-5 py-2 rounded-lg font-semibold hover:bg-slate-800">Login</Link>
          <Link href="/create" className="bg-white text-slate-900 px-5 py-2 rounded-lg font-semibold hover:bg-slate-200">Start Free</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 py-28">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Create a stunning business website <span className="text-sky-400">in minutes</span>
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Pick your industry, enter your details, and get a polished, themed website instantly —
          for any business, any stream, small or large.
        </p>
        <Link href="/create" className="inline-block mt-10 bg-sky-500 hover:bg-sky-400 px-8 py-4 rounded-xl text-lg font-bold">
          Build My Website →
        </Link>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-24">
        {[
          { t: "8 Industry Themes", d: "Restaurant, clinic, law, retail, salon, tech, education & more." },
          { t: "AI-Written Copy", d: "Taglines and service descriptions generated for your business." },
          { t: "Instant Preview", d: "See your site live before you publish. No code needed." },
        ].map((f) => (
          <div key={f.t} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">{f.t}</h3>
            <p className="text-slate-400 mt-2 text-sm">{f.d}</p>
          </div>
        ))}
      </section>

      <footer className="text-center py-8 border-t border-slate-800 text-slate-500 text-sm">
        © {new Date().getFullYear()} Riyaz Web Studio · Developed by <span className="text-slate-300 font-semibold">Mohammed Riyazuddin</span>
      </footer>
    </main>
  );
}
