"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabase";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  async function handlePayment() {
    if (!user) {
      alert("Please log in first to upgrade.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("/api/razorpay", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ createOrder: true })
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Riyaz Web Studio",
        description: "Upgrade to Pro Plan",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              verify: true,
              ...response,
              userId: user.id
            }),
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.status === "success") {
            alert("Payment Successful! You are now a Pro user.");
            window.location.href = "/dashboard";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: { color: "#0ea5e9" },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
      
    } catch (e) {
      alert("Something went wrong: " + e.message);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-2">Upgrade to Pro</h1>
      <p className="text-slate-400 mb-8 text-center max-w-md">Unlock unlimited websites, custom domains, and remove our branding.</p>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center">Pro Plan</h2>
        <div className="text-center my-6">
          <span className="text-5xl font-extrabold text-sky-400">₹499</span>
          <span className="text-slate-400">/month</span>
        </div>
        
        <ul className="space-y-3 mb-8 text-sm text-slate-300">
          <li>✅ Unlimited Websites</li>
          <li>✅ Connect Custom Domains</li>
          <li>✅ Remove "Developed by" footer</li>
          <li>✅ Priority Support</li>
        </ul>

        <button 
          onClick={handlePayment} 
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upgrade Now"}
        </button>
      </div>

      <Link href="/dashboard" className="mt-8 text-slate-500 hover:text-white underline">
        Back to Dashboard
      </Link>
    </main>
  );
}
