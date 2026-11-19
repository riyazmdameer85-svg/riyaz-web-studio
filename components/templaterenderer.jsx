import { themes } from "@/lib/themes";

export default function TemplateRenderer({ data, theme: themeKey }) {
  const theme = themes[themeKey] || themes.other;
  const services = data.services || [];
  const descriptions = data.serviceDescriptions || [];

  return (
    <div style={{ fontFamily: theme.font }} className="bg-white text-slate-900">
      <section style={{ background: theme.primary }} className="px-8 py-24 text-center text-white">
        <p className="uppercase tracking-widest text-sm opacity-80">{theme.name}</p>
        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">{data.businessName}</h1>
        <p className="text-xl mt-4 max-w-2xl mx-auto opacity-90">{data.tagline}</p>
        {data.phone && (
          <a href={`tel:${data.phone}`} style={{ background: theme.accent }} className="inline-block mt-8 px-8 py-3 rounded-xl font-bold text-slate-900">
            Call Us: {data.phone}
          </a>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>About Us</h2>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">{data.about}</p>
      </section>

      <section className="bg-slate-50 px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center" style={{ color: theme.primary }}>Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div style={{ background: theme.accent }} className="w-10 h-1 rounded mb-4" />
                <h3 className="font-bold text-lg">{s}</h3>
                <p className="text-slate-500 text-sm mt-2">{descriptions[i] || "Quality service you can rely on."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>Contact Us</h2>
        <div className="mt-8 space-y-3 text-slate-600">
          {data.phone && <p>📞 {data.phone}</p>}
          {data.email && <p>✉️ {data.email}</p>}
          {data.address && <p>📍 {data.address}</p>}
        </div>
        {data.phone && (
          <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, "")}`} target="_blank" className="inline-block mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold">
            WhatsApp Us
          </a>
        )}
      </section>

      <footer style={{ background: theme.primary }} className="text-white text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} {data.businessName}. All rights reserved.</p>
        <p className="mt-2 opacity-80">
          Website created with <strong>Riyaz Web Studio</strong> · Developed by <span className="font-bold">Mohammed Riyazuddin</span>
        </p>
      </footer>
    </div>
  );
}
