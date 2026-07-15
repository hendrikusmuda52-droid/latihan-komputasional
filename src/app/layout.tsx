import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9",
  description:
    "Aplikasi latihan mengetik dan soal HOTS berpikir komputasional untuk siswa SMP kelas 9. Dua tahap: mengetik 40 menit dan 30 soal pilihan ganda 25 menit.",
  keywords: [
    "berpikir komputasional",
    "mengetik",
    "SMP",
    "HOTS",
    "dekomposisi",
    "algoritma",
    "abstraksi",
    "pengenalan pola",
  ],
  authors: [{ name: "Aplikasi Latihan Komputasional" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
