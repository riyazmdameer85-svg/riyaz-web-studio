import { supabase } from "@/lib/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { makeSlug } from "@/lib/supabase";

async function getUser() {
  const cookieStore = cookies();
  const sb = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

export async function POST(req) {
  const user = await getUser();
  if (!user) return Response.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json();
  const { businessName, industry, formData, content } = body;

  let baseSlug = makeSlug(businessName);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const { data: existing } = await supabase.from("sites").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const { data, error } = await supabase
    .from("sites")
    .insert({
      slug,
      business_name: businessName,
      industry,
      form_data: formData,
      content,
      published: true,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function GET() {
  const user = await getUser();
  if (!user) return Response.json({ error: "Not logged in" }, { status: 401 });

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(req) {
  const user = await getUser();
  if (!user) return Response.json({ error: "Not logged in" }, { status: 401 });

  const { id } = await req.json();
  const { error } = await supabase.from("sites").delete().eq("id", id).eq("user_id", user.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
