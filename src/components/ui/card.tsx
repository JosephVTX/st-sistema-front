import axios from "@/libs/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function Card({ product, onDelete }: { product: Product, onDelete: () => void }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (
        confirm(
          `¿Estás seguro que deseas eliminar el producto "${product.name}"?`
        )
      ) {
        await axios.delete(`/products/${product.id}`);
        // Llamar a la función onDelete que recibimos como prop
        onDelete();
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-2xl flex flex-col gap-4 hover:bg-secondary/80 transition-colors">
      <div className="aspect-square rounded-xl overflow-hidden relative">
        <img
          src={product.image}
          alt="product"
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-400">${product.price}</p>
          <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>
      </div>
      <div className="flex mt-auto">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="w-full bg-primary text-white py-2 rounded-full text-center"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
