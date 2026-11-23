 "use client";
import { useState } from "react";
import { industries } from "../lib/themes";
import { supabaseBrowser } from "../lib/supabase";

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
    map_url: "",
    whatsapp_msg: "Hi, I'd like to book an appointment!",
    testimonials: "", // NEW
    pricing: "", // NEW
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
    if (error) alert("Upload failed: " + error.message);
    else {
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
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Create Your Website</h1>
        <p className="text-slate-400 mb-8">Fill in your details — we'll build the page instantly.</p>

        <form onSubmit={submit} className="space-y-5 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Business Name *</label>
            <input value={form.businessName} onChange={set("businessName")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Spice Garden Restaurant" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Industry</label>
            <select value={form.industry} onChange={set("industry")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none">
              {industries.map((i) => <option key={i.key} value={i.key}>{i.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tagline (optional)</label>
            <input value={form.tagline} onChange={set("tagline")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Authentic flavours since 1995" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">About (optional)</label>
            <textarea value={form.about} onChange={set("about")} rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="Short description of your business" />
          </div>

         <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
            <input value={form.phone} onChange={set("phone")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. +91 98765 43210" />
         </div>

         <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input value={form.email} onChange={set("email")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. hello@mycafe.com" />
         </div>
         
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Services / Products (comma separated) *</label>
            <input value={form.services} onChange={set("services")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Biryani, Kebabs, Desserts" required />
          </div>

          {/* NEW FIELDS FOR PHASE 2 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Pricing / Menu (optional)</label>
            <textarea value={form.pricing} onChange={set("pricing")} rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Chicken Biryani - ₹250, Veg Biryani - ₹180" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Testimonials (optional)</label>
            <textarea value={form.testimonials} onChange={set("testimonials")} rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder='e.g. "Best food in town!" - Rahul, "Great service." - Priya' />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">High-Res Cover Image</label>
            <select value={form.cover_url} onChange={set("cover_url")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none">
              <option value="">None (Use Theme Color)</option>
              <option value="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80">Modern Office</option>
              <option value="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80">Cafe / Restaurant</option>
              <option value="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80">Healthcare / Clinic</option>
              <option value="https://images.unsplash.com/photo-1599643478514-4a420a5e17bc?auto=format&fit=crop&w=1920&q=80">Jewellery / Retail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Logo (Optional)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            {uploading && <p className="text-sm text-sky-600 mt-1">Uploading...</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Google Maps Link (Optional)</label>
            <input value={form.map_url} onChange={set("map_url")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="Paste your Google Maps share link here" />
          </div>
         <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Default WhatsApp Message</label>
            <input value={form.whatsapp_msg} onChange={set("whatsapp_msg")} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Hi, I'd like to book an appointment!" />
         </div>

          <button disabled={loading || uploading} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
            {loading ? "Generating..." : "Generate My Website →"}
          </button>
        </form>
      </div>
    </div>
  );
}
