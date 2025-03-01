"use client";

import { useFetch } from "@/hooks/use-fetch";

export default function Categories({
  onChange,
  defaultValue = "",
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const { data: categories } = useFetch("/categories", true);
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded p-2 appearance-none bg-white"
    >
      <option value="" disabled>
        Selecciona una categoría
      </option>
      {categories?.map((category: any) => (
        <option key={category.id} value={`${category.id}`}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
