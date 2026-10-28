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
  title: "Dot Dairy | নওগাঁর প্যারা সন্দেশ ও দেশি খাবার",

  description:
    "নওগাঁর ঐতিহ্যবাহী প্যারা সন্দেশ, নারকেল নাড়ু, আলুর পাপড়, খেজুরের গুড়, আখের জুস পাউডার, আম, হোমমেড কেক, পিজ্জা ও ফ্রোজেন ফুড কিনুন Dot Dairy থেকে।",

  metadataBase: new URL("https://dotdairy.com"),

  openGraph: {
    title: "Dot Dairy | খাঁটি স্বাদ, দেশি খাবার",
    description:
      "ঐতিহ্যবাহী দেশি খাবার ও মানসম্মত ফ্রেশ ফুড পণ্য অর্ডার করুন Dot Dairy থেকে।",
    url: "https://dotdairy.com",
    siteName: "Dot Dairy",
    locale: "bn_BD",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
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
