"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AuthProvider } from "../providers/AuthProvider";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        <Sidebar />
        <main className="flex flex-row px-2 lg:px-18">{children}</main>
        <Footer />
      </AuthProvider>
    </Provider>
  );
}
