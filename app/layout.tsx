"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Sidebar from "../components/sidebar";

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
        <Provider store={store}>
          <Navbar />
          <Sidebar />
          <main className="flex flex-row px-2 lg:px-18">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
