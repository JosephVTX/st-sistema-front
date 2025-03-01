'use client';

import { useQueryParams } from "@/hooks/use-query-params";
import { useFetch } from "@/hooks/use-fetch";



export default function Select() {
  const { data: categories } = useFetch("/categories");
  const { setQueryParam, getQueryParam } = useQueryParams();
  const currentCategory = getQueryParam("category");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParam('category', e.target.value);
  };

  return (
    <select 
      className="capitalize outline-none border-none min-w-40"
      defaultValue={currentCategory}
      onChange={handleChange}
    >
      <option value="">Todos</option>
      {categories?.map((category: any) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
