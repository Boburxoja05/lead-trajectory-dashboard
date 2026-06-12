import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Lead Trajectory Dashboard",
  description: "Meta Ads & CRM Performance Report",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body style={{ minHeight: "100vh" }}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
