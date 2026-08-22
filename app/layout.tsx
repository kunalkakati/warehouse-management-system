import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // Optional: Inter supports variable weights, so you don't need to specify them
});

// 2. Configure a Mono font for SKUs and data tables (Optional but recommended)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Orion-Wearhouse Managment System",
  description: "a wearhouse managment system",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
