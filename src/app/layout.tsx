import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "./_components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Created with ShadCN UI, Re-charts and Lucide React Icons",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="dashboard-theme"
        >
          <TRPCReactProvider>
            <Navbar />
            <div className="flex">
              <div className="hidden h-[100vh] w-[300px] md:block">
                <Sidebar />
              </div>
              <div className="w-full p-5 md:max-w-[1140px]">{children}</div>
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
