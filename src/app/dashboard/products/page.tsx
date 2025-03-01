"use client";

import Search from "./components/search";
import { useFetch } from "@/hooks/use-fetch";
import Select from "./components/select";
import Link from "next/link";
const Card = ({ product }: { product: any }) => (
  <div className="bg-secondary p-6 rounded-2xl flex flex-col gap-4 hover:bg-secondary/80 transition-colors">
    <div className="aspect-square rounded-xl overflow-hidden relative">
      <img
        src={product.image}
        alt="product"
        className="w-full h-full object-cover hover:scale-105 transition-transform"
      />
      <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
        {product.category.name}
      </span>
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-gray-400">${product.price}</p>
        
      </div>
    </div>
    <Link href={`/dashboard/products/${product.id}`} className="w-full bg-primary text-white py-2 rounded-full text-center">Editar Producto</Link>
  </div>
);

export default function Page() {
  const { data: products } = useFetch('/products', true);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.length > 0 ? (
          products?.map((product: any) => (
            <Card key={product.id} product={product} />
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
