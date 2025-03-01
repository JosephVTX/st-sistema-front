"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <dialog
      className="fixed h-svh w-svw top-0 left-0 z-100 flex items-center justify-center bg-black/50"
      open
    >
      <div className="relative bg-white rounded-2xl w-full h-full md:h-auto md:w-6/12 p-4 max-h-svh overflow-y-auto">
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button> 
        {children}
      </div>
    </dialog>
  );
}
