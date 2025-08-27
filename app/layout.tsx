import { Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "../providers/MainProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans flex flex-col max-w-screen`}
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
