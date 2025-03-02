"use client";

import Search from "./components/search";
import { useFetch } from "@/hooks/use-fetch";
import Select from "./components/select";
import Link from "next/link";

import Card from "@/components/ui/card";



export default function Page() {
  const { data: products, refetch } = useFetch('/products', true);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-secondary p-4 rounded-2xl">
        <h1 className="text-2xl font-bold">Productos</h1>
          <Select />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3">
          <Search />
        </div>
        <div className="col-span-1">
          <Link className="bg-primary text-white py-2 rounded-full w-full text-center block" href="/dashboard/products/create">
            Agregar Producto
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.length > 0 ? (
          products?.map((product: any) => (
            <Card key={product.id} product={product} onDelete={refetch} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  );
}
