"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AuthProvider } from "../providers/AuthProvider";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        <Sidebar />
        <main className="flex flex-row py-8 px-2 lg:px-18">{children}</main>
      </AuthProvider>
    </Provider>
  );
}
