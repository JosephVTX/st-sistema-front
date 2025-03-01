"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Search() {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(getQueryParam("search") || "");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar el timer anterior si existe
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Crear un nuevo timer
    timerRef.current = setTimeout(() => {
      setQueryParam("search", searchTerm);
    }, 500);

    // Limpiar el timer cuando el componente se desmonte o searchTerm cambie
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm, setQueryParam]);

  return (
    <div className="flex items-center gap-2 relative w-full">
      <input
        type="text"
        placeholder="Buscar productos"
        className="w-full bg-secondary p-2 rounded-2xl pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
