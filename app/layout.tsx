import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "ফ্রেশ ফ্লেভার্স এগ্রো | Fresh Flavours Agro – নওগাঁর প্যারা সন্দেশ ও দেশি খাবার",

  description:
    "নওগাঁর প্যারা সন্দেশ, নারকেল নাড়ু, আলুর পাপড়, খেজুরের গুড়, আখের জুস পাউডার, আমসহ হোমমেড কেক, পিজ্জা ও ফ্রোজেন আইটেম পান ফ্রেশ ফ্লেভার্স এগ্রোতে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
