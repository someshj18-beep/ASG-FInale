import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arctic Staffing Global | People. Process. Possibility.",
  description: "Flexible staffing, recruitment process outsourcing, business process outsourcing, and IT talent solutions.",
  metadataBase: new URL("https://arctic-staffing-global.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arctic Staffing Global",
    description: "People. Process. Possibility.",
    url: "https://arctic-staffing-global.com",
    siteName: "Arctic Staffing Global",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
