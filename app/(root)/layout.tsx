/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/toaster"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connectivity Grid Tool",
  description: ""
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className,        
        )}
      > 
        <div className="w-full">
          
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>
            
            {children}</AdminPanelLayout>
          </ThemeProvider></div>
      </body>
    </html>
  );
}