"use client";

import { AuthProvider } from "../providers/AuthProvider";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      <Sidebar />
      <main className="flex flex-row py-8 px-2 lg:px-18">{children}</main>
    </AuthProvider>
  );
}
