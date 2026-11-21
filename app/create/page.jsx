"use client";
import { useState } from "react";
import SiteForm from "../../components/SiteForm";
import TemplateRenderer from "../../components/TemplateRenderer";

export default function CreatePage() {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState(null);

  async function handleGenerate(formData) {
    setLoading(true);
    setPublishedUrl(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const content = await res.json();
      setSite({ ...formData, content });
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: site.businessName,
          industry: site.industry,
          formData: {
            businessName: site.businessName,
            industry: site.industry,
            phone: site.phone,
            email: site.email,
            address: site.address,
            services: site.services,
            tagline: site.tagline,
            about: site.about,
          },
          content: site.content,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPublishedUrl(`/site/${data.slug}`);
    } catch (e) {
      alert("Publish failed: " + e.message);
    }
    setPublishing(false);
  }

  if (!site) return <SiteForm onSubmit={handleGenerate} loading={loading} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-slate-900 text-white flex flex-wrap gap-3 justify-between items-center px-6 py-3">
        <span className="font-semibold">Preview — Riyaz Web Studio</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSite(null)} className="bg-slate-700 px-4 py-2 rounded-lg text-sm">← Edit</button>
          <button onClick={() => window.print()} className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Print</button>
          {!publishedUrl ? (
            <button onClick={handlePublish} disabled={publishing} className="bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50">
              {publishing ? "Publishing..." : "🚀 Publish Site"}
            </button>
          ) : (
            <a href={publishedUrl} target="_blank" className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-lg text-sm font-bold">✅ View Live Site</a>
          )}
        </div>
      </div>
      {publishedUrl && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 text-center text-emerald-800 text-sm">
          🎉 Your site is live at <a href={publishedUrl} target="_blank" className="font-bold underline">{typeof window !== "undefined" ? window.location.origin : ""}{publishedUrl}</a>
        </div>
      )}
      <TemplateRenderer data={{ ...site, ...site.content }} theme={site.industry} />
    </div>
  );
}
