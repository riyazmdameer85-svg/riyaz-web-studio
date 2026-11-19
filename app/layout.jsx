import "./globals.css";

export const metadata = {
  title: "Riyaz Web Studio — Business sites in minutes",
  description: "Create a professional business website in minutes. Developed by Mohammed Riyazuddin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
