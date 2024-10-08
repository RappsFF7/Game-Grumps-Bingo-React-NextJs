import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/_components/header";
import GameboardContextProvider from "@/app/_contexts/gameboardContext";
import "./globals.css";
import "./layout.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GameboardContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <div id='ggb'>
            <div id="background">
                <div id="background-left"></div>
                <div id="background-right"></div>
            </div>
            <div id="content">
                <Header />
                {children}
                <div id="dialogs">
                    <div id="dlg" className="dialog"></div>
                </div>
            </div>
          </div>
        </body>
      </html>
    </GameboardContextProvider>
  );
}
