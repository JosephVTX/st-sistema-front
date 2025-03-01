"use client";

import { PanelLeft } from "lucide-react";
import Menu from "./menu";
import { useAuth } from "@/providers/auth";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white flex items-center justify-between h-14 top-to-bottom">
      <UserInfo />
      <Menu />
    </header>
  );
}

function UserInfo() {
  const user = useAuth();

  return (
    <>
      <label className="sm:hidden" htmlFor="drawer-toggle">
        <PanelLeft className="size-6" />
      </label>
      <div className="flex flex-col max-sm:hidden">
        <span className="text-sm font-medium leading-none">{user.name}</span>
        <span className="text-xs text-gray-500">
          Administrador
        </span>
      </div>
    </>
  );
}
