import ClientProvider from '@/components/SessionWraper';
import React from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';
import Header from '@/components/Header';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SnapShopr",
  description: "Your Market Place for Everything",
  icons: {
    icon: '/icons/webicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
