"use client";
import { useState } from "react";
import { industries } from "../../lib/themes";
import { supabaseBrowser } from "../../lib/supabase";

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
    logo_url: "",
    cover_url: "",
  });
  
  const [uploading, setUploading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const supabase = supabaseBrowser();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error } = await supabase.storage.from('site-images').upload(fileName, file);
    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      const { data } = supabase.storage.from('site-images').getPublicUrl(fileName);
      setForm((prev) => ({ ...prev, logo_url: data.publicUrl }));
    }
    setUploading(false);
  }

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
          <input value={form.address} onChange={set("address")} className="w-full border rounded-lg px-4 py-2" placeholder="Street, City, State" />
        </div>

        {/* HIGH RES COVER IMAGES */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">High-Res Cover Image</label>
          <select value={form.cover_url} onChange={set("cover_url")} className="w-full border rounded-lg px-4 py-2">
            <option value="">None (Use Theme Color)</option>
            <option value="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80">Modern Office</option>
            <option value="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80">Cafe / Restaurant</option>
            <option value="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80">Healthcare / Clinic</option>
            <option value="https://images.unsplash.com/photo-1599643478514-4a420a5e17bc?auto=format&fit=crop&w=1920&q=80">Jewellery / Retail</option>
            <option value="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80">Real Estate</option>
          </select>
        </div>

        {/* LOGO UPLOAD */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Logo (Optional)</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full border rounded-lg px-4 py-2" />
          {uploading && <p className="text-sm text-sky-600 mt-1">Uploading logo...</p>}
          {form.logo_url && <p className="text-sm text-green-600 mt-1">Logo uploaded successfully!</p>}
        </div>

        <button disabled={loading || uploading} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg disabled:opacity-50">
          {loading ? "Generating your website..." : "Generate My Website →"}
        </button>
      </form>
    </div>
  );
}
