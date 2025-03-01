"use client";

import { useState } from "react";
import Categories from "./partials/categories";
import ImageUpload from "./partials/image-upload";
import { useRouter } from "next/navigation";
import axios from "@/libs/axios";

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    code: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    try {
      setIsLoading(true);
      // Aquí iría la lógica para enviar los datos al servidor
      await axios.post("/products", formData);
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Ocurrió un error al crear el producto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo producto</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Imagen del producto</h2>
          <ImageUpload onChange={handleImageChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Categoría <span className="text-red-500">*</span>
            </label>
            <Categories onChange={handleCategoryChange} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">
              Precio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 pl-8 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Código</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition disabled:bg-indigo-300"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
