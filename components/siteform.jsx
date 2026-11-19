"use client";
import { useState } from "react";
import { industries } from "@/lib/themes";

export default function SiteForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "restaurant",
    tagline: "",
    about: "",
    services: "",
    phone: "",
    email: "",
    address: "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!form.businessName.trim()) return alert("Please enter your business name.");
    const services = form.services.split(",").map((s) => s.trim()).filter(Boolean);
    onSubmit({ ...form, services });
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-slate-900">Create Your Website</h1>
      <p className="text-slate-500 mt-1">Fill in your details — we'll build the page instantly.</p>

      <form onSubmit={submit} className="mt-8 space-y-5 bg-white p-8 rounded-2xl shadow">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Business Name *</label>
          <input value={form.businessName} onChange={set("businessName")} className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Spice Garden Restaurant" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Industry</label>
          <select value={form.industry} onChange={set("industry")} className="w-full border rounded-lg px-4 py-2">
            {industries.map((i) => <option key={i.key} value={i.key}>{i.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Tagline (optional — AI will write if blank)</label>
          <input value={form.tagline} onChange={set("tagline")} className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Authentic flavours since 1995" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">About (optional)</label>
          <textarea value={form.about} onChange={set("about")} rows={3} className="w-full border rounded-lg px-4 py-2" placeholder="Short description of your business" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Services / Products (comma separated) *</label>
          <input value={form.services} onChange={set("services")} className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Biryani, Kebabs, Desserts" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
            <input value={form.phone} onChange={set("phone")} className="w-full border rounded-lg px-4 py-2" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input value={form.email} onChange={set("email")} className="w-full border rounded-lg px-4 py-2" placeholder="hello@business.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
          <input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full border rounded-lg px-4 py-2" placeholder="Street, City, State" />
        </div>

        <button disabled={loading} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg disabled:opacity-50">
          {loading ? "Generating your website..." : "Generate My Website →"}
        </button>
      </form>
    </div>
  );
}
