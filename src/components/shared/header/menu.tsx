"use client";


import { logout } from "@/actions/auth";
import { useAuth } from "@/providers/auth";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Menu() {
  const user = useAuth();

  return (
    <div className="relative group" tabIndex={0}>
      <button className="relative h-10 w-10 rounded-full outline-none focus:ring-2 focus:ring-primary">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image
            className="transition-transform duration-500 hover:scale-125"
            src="/images/grupo5.jpg"      
            width={40}
            height={40}
            alt="Avatar"
          />
        </div>
      </button>

      <ul className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transform scale-95 group-focus-within:scale-100 transition-all duration-300 overflow-hidden">
        <li className="p-3">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </li>
        <li className="border-t border-gray-100"></li>
        <li className="border-t border-gray-100"></li>
        <li>
          <button 
            onClick={logout} 
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <span className="flex items-center">
              <LogOut className="w-4 h-4 mr-3 text-gray-500" />
              Cerrar sesión
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
