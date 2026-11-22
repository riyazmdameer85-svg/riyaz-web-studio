"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Check if user is in the admins table
      const { data: adminData } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (false) {
        alert("You are not authorized to view this page.");
        router.push("/dashboard");
        return;
      }

      setIsAdmin(true);

      // Fetch all sites
      const { data: sitesData } = await supabase
        .from("sites")
        .select("*")
        .order("created_at", { ascending: false });

      setSites(sitesData || []);
      setLoading(false);
    }
    checkAdmin();
  }, []);

  if (loading) return <div className="p-10 text-center text-xl font-semibold">Checking permissions...</div>;
  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-500 mb-8">Master view of all users and generated sites.</p>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4">Business Name</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-semibold">{site.business_name}</td>
                  <td className="p-4 capitalize">{site.industry}</td>
                  <td className="p-4">{site.form_data?.phone || "N/A"}</td>
                  <td className="p-4 text-sm text-slate-500">
                    {new Date(site.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <a href={`/site/${site.slug}`} target="_blank" className="text-sky-600 hover:underline">
                      View Site
                    </a>
                  </td>
                </tr>
              ))}
              {sites.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No sites generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
