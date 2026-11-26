"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QRPage() {
  const params = useParams();
  const router = useRouter();
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteUrl(`${window.location.origin}/site/${params.slug}`);
    }
  }, [params.slug]);

  // We use a free API to generate the QR code image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(siteUrl)}`;

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Your QR Code</h1>
        <p className="text-slate-500 mb-8">Scan this to visit the website.</p>

        {siteUrl ? (
          <div className="bg-slate-50 p-4 rounded-2xl inline-block border-2 border-slate-200">
            <img src={qrImageUrl} alt="QR Code" className="w-64 h-64 mx-auto" />
          </div>
        ) : (
          <div className="w-64 h-64 bg-slate-200 animate-pulse mx-auto rounded-2xl"></div>
        )}

        <div className="mt-8 space-y-3">
          <a 
            href={qrImageUrl} 
            target="_blank" 
            download="qr-code.png"
            className="block w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl"
          >
            Download QR Code
          </a>
          <button 
            onClick={() => router.push("/dashboard")}
            className="block w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
