import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import AuthTokenHandler from "@/lib/auth_token handler";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "SPAZ",
  description: "SPotify music AnalyZer",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <AuthTokenHandler />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
