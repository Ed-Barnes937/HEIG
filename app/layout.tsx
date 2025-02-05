import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { Background } from "@/components/Background";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Home Education Idea generator",
  description:
    "Generate neurodiverse and demand-avoidant friendly prompts for home education ideas",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen grid grid-rows-[auto_1fr_auto] items-center bg-gradient-to-b">
            <div className="absolute -z-10 h-screen w-screen">
              <Background />
            </div>
            <nav className="w-full flex justify-between border-b-foreground/10 h-32 px-8">
              <div className="font-semibold">
                <Link href={"/"}>
                  <Logo />
                </Link>
              </div>
              <HeaderAuth />
            </nav>
            {children}
            <footer className="w-full flex items-center justify-end border-t text-xs gap-8 p-6">
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
