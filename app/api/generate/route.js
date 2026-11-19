import OpenAI from "openai";

function fallback(data) {
  const svc = data.services?.length ? data.services : ["Our Services"];
  return {
    tagline: data.tagline || `Welcome to ${data.businessName} — quality you can trust.`,
    about: data.about || `${data.businessName} is a trusted ${data.industry} business committed to excellence. We serve our customers with dedication, precision, and care.`,
    serviceDescriptions: svc.map((s) => `Professional ${s.toLowerCase()} delivered with the highest standards.`),
  };
}

export async function POST(req) {
  const data = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(fallback(data));
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are a professional website copywriter. Write concise website content for this business.
Business Name: ${data.businessName}
Industry: ${data.industry}
Services: ${data.services.join(", ")}
Return ONLY valid JSON with keys: "tagline" (max 10 words), "about" (2 short sentences), "serviceDescriptions" (array of one short sentence per service, same order).`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return Response.json(JSON.parse(res.choices[0].message.content));
  } catch (e) {
    return Response.json(fallback(data));
  }
}
