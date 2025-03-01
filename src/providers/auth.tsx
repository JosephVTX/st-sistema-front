"use client";

import { User } from "@/types/user";
import { createContext, useContext } from "react";

const AuthContext = createContext<unknown>(null);

export const useAuth = () => useContext(AuthContext) as User;

export default function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: unknown;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
