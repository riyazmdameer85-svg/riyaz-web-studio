 import { themes } from "../lib/themes";

export default function TemplateRenderer({ data, theme: themeKey }) {
  const theme = themes[themeKey] || themes.other;
  const services = data.services || [];
  const descriptions = data.serviceDescriptions || [];
  const faqs = data.faqs || [];

  const cleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, "") : "";
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(data.whatsapp_msg || "Hello!")}`;

  return (
    <div style={{ fontFamily: theme.font }} className="bg-slate-50 text-slate-900 relative">
      
      {/* FLOATING WHATSAPP BUTTON */}
      {cleanPhone && (
        <a href={waLink} target="_blank" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      )}

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
        {data.cover_url && <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>}
        <div className="relative z-10 max-w-4xl mx-auto">
          {data.logo_url && <img src={data.logo_url} alt="Logo" className="w-28 h-28 object-contain mx-auto mb-6 bg-white rounded-full p-2 shadow-xl" />}
          <p className="uppercase tracking-widest text-sm font-bold opacity-90 drop-shadow-md">{theme.name}</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 drop-shadow-lg">{data.businessName}</h1>
          <p className="text-xl md:text-2xl mt-6 max-w-2xl mx-auto opacity-95 drop-shadow-md">{data.tagline}</p>
        </div>
      </section>

      {/* ABOUT - Creative Dot Background */}
      <section className="px-8 py-20 text-center relative" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>About Us</h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">{data.about}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center" style={{ color: theme.primary }}>Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {services.map((s, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                <div style={{ background: theme.accent }} className="w-10 h-1 rounded mb-4" />
                <h3 className="font-bold text-lg">{s}</h3>
                <p className="text-slate-500 text-sm mt-2">{descriptions[i] || "Quality service you can rely on."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="px-8 py-20 max-w-4xl mx-auto bg-slate-50 rounded-3xl my-12 border border-slate-100">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.primary }}>Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg text-slate-800">{faq.question}</h3>
                <p className="text-slate-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT & MAP */}
      <section className="px-8 py-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primary }}>Contact Us</h2>
          <div className="space-y-4 text-slate-600 text-lg">
            {data.phone && <p>📞 {data.phone}</p>}
            {data.email && <p>✉️ {data.email}</p>}
            {data.address && <p>📍 {data.address}</p>}
          </div>
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{ background: theme.accent }} className="inline-block mt-8 px-8 py-3 rounded-xl font-bold text-slate-900 shadow-lg">
              Call Us Now
            </a>
          )}
        </div>
        
        {/* GOOGLE MAPS */}
        <div className="h-64 md:h-80 bg-slate-200 rounded-2xl overflow-hidden shadow-inner">
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || data.businessName)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: theme.primary }} className="text-white text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} {data.businessName}. All rights reserved.</p>
        <p className="mt-2 opacity-80">Website created with <strong>Riyaz Web Studio</strong> · Developed by <span className="font-bold">Mohammed Riyazuddin</span></p>
      </footer>
    </div>
  );
}
