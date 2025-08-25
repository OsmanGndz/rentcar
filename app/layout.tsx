"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthListener } from "../hooks/useAuthListener";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans flex flex-col max-w-screen`}
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
