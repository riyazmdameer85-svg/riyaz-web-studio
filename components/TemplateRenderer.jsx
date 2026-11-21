import { themes } from "../../lib/themes";

export default function TemplateRenderer({ data, theme: themeKey }) {
  const theme = themes[themeKey] || themes.other;
  const services = data.services || [];
  const descriptions = data.serviceDescriptions || [];

  return (
    <div style={{ fontFamily: theme.font }} className="bg-white text-slate-900">
      {/* HERO SECTION */}
      <section 
        style={{ 
          backgroundImage: data.cover_url ? `url(${data.cover_url})` : 'none',
          backgroundColor: theme.primary,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
        className="px-8 py-32 text-center text-white relative"
      >
        {data.cover_url && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {data.logo_url && (
            <img src={data.logo_url} alt="Logo" className="w-28 h-28 object-contain mx-auto mb-6 bg-white rounded-full p-2 shadow-xl" />
          )}
          <p className="uppercase tracking-widest text-sm font-bold opacity-90 drop-shadow-md">{theme.name}</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 drop-shadow-lg">{data.businessName}</h1>
          <p className="text-xl md:text-2xl mt-6 max-w-2xl mx-auto opacity-95 drop-shadow-md">{data.tagline}</p>
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{ background: theme.accent }} className="inline-block mt-10 px-10 py-4 rounded-xl font-bold text-slate-900 shadow-lg hover:scale-105 transition-transform">
              Call Us: {data.phone}
            </a>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>About Us</h2>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">{data.about}</p>
      </section>

      {/* SERVICES */}
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

      {/* CONTACT */}
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

      {/* FOOTER */}
      <footer style={{ background: theme.primary }} className="text-white text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} {data.businessName}. All rights reserved.</p>
        <p className="mt-2 opacity-80">
          Website created with <strong>Riyaz Web Studio</strong> · Developed by <span className="font-bold">Mohammed Riyazuddin</span>
        </p>
      </footer>
    </div>
  );
}
