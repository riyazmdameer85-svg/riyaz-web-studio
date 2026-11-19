import { supabase } from "@/lib/supabase";
import TemplateRenderer from "@/components/TemplateRenderer";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { data } = await supabase.from("sites").select("business_name, content").eq("slug", params.slug).single();
  if (!data) return { title: "Site not found" };
  return {
    title: `${data.business_name} — Built with Riyaz Web Studio`,
    description: data.content?.tagline || "",
  };
}

export default async function PublicSite({ params }) {
  const { data, error } = await supabase.from("sites").select("*").eq("slug", params.slug).eq("published", true).single();
  if (error || !data) notFound();
  const merged = { ...data.form_data, ...data.content };
  return <TemplateRenderer data={merged} theme={data.industry} />;
}
