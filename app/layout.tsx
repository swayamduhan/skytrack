import type { Metadata } from "next";
import localfont from "next/font/local"
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

const conforto = localfont({
  src : [
    {
      path : "../public/fonts/conforto/confortotrial-bold.otf",
      weight : "700",
      style : "normal"
    },
    {
      path : "../public/fonts/conforto/confortotrial-regular.otf",
      weight : "400",
      style : "normal"
    }
  ],
  variable : "--font-conforto"
})

const satoshi = localfont({
  src : [
    {
      path : "../public/fonts/satoshi/Satoshi-Bold.otf",
      weight : "700",
      style : "normal"
    },
    {
      path : "../public/fonts/satoshi/Satoshi-Regular.otf",
      weight : "400",
      style : "normal"
    },
    {
      path : "../public/fonts/satoshi/Satoshi-Black.otf",
      weight : "900",
      style : "normal"
    }
  ],
  variable : "--font-satoshi"
})



export const metadata: Metadata = {
  title: "Flight Price Tracker",
  description: "get flight prices, get notified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${conforto.variable} ${satoshi.variable} antialiased dark`}
      >
          <main>{children}</main>
          <Toaster toastOptions={{
            classNames : {
              toast : 'dark:bg-black dark:border-white/20 dark:text-white'
            }
          }}/>
      </body>
    </html>
  );
}