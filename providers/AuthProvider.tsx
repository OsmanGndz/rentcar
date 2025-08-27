"use client";
import { useAuthListener } from "../hooks/useAuthListener";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthListener();
  return <>{children}</>;
}
