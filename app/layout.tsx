import "./globals.css";
import { CustomClerkProivider } from "@/services/clerk/components/CustomClerkProvider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Prep",
  description:
    "AI-powered job preparation tool that helps users practice interviews, answer technical questions, and tailor their resumes based on uploaded job descriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomClerkProivider>
      <html
        lang="en"
        className={`${outfitSans.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableColorScheme
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </CustomClerkProivider>
  );
}
