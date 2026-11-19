export const themes = {
  restaurant: { name: "Restaurant", primary: "#B91C1C", accent: "#F59E0B", font: "'Playfair Display', Georgia, serif" },
  clinic:     { name: "Clinic / Healthcare", primary: "#0E7490", accent: "#22D3EE", font: "'Inter', sans-serif" },
  lawfirm:    { name: "Law Firm", primary: "#1E3A8A", accent: "#C9A227", font: "'Merriweather', Georgia, serif" },
  retail:     { name: "Retail / Store", primary: "#7C3AED", accent: "#F472B6", font: "'Poppins', sans-serif" },
  salon:      { name: "Salon / Spa", primary: "#BE185D", accent: "#FBCFE8", font: "'Lato', sans-serif" },
  tech:       { name: "Tech / Startup", primary: "#0F172A", accent: "#38BDF8", font: "'Inter', sans-serif" },
  education:  { name: "Education / Coaching", primary: "#15803D", accent: "#FACC15", font: "'Poppins', sans-serif" },
  other:      { name: "Other Business", primary: "#334155", accent: "#94A3B8", font: "'Inter', sans-serif" },
};

export const industries = Object.entries(themes).map(([key, v]) => ({ key, ...v }));
