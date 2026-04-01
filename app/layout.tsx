import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import InteractiveLayout from "@/components/InteractiveLayout";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TruthLens | Media Literacy Guide",
  description: "Identify deepfakes and misinformation with our AI-powered guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased selection:bg-[#00C2CB]/30">
        <InteractiveLayout>
          {children}

        </InteractiveLayout>
      </body>
    </html>
  );
}