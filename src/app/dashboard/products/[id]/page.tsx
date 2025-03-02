"use client";

import { useState, useEffect } from "react";
import Categories from "../create/partials/categories";
import ImageUpload from "../create/partials/image-upload";
import { useRouter, useParams } from "next/navigation";
import axios from "@/libs/axios";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null as File | null,
  });
  const [initialImageUrl, setInitialImageUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        const product = response.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category.id || "",
          price: product.price?.toString() || "",
          stock: product.stock?.toString() || "",
          image: null,
        });

        setInitialImageUrl(product.image || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error al cargar los datos del producto");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    try {
      setIsLoading(true);

      // Create a FormData object to properly handle file uploads
      const submitData = new FormData();
      submitData.append("_method", "PATCH");
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("category_id", formData.category);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);

      // Only append the image if it exists
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // Send the FormData object instead of the regular formData
      await axios.post(`/products/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Ocurrió un error al actualizar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">Cargando datos del producto...</div>
    );
  }

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-6">Editar producto</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Imagen del producto</h2>
          <ImageUpload
            onChange={handleImageChange}
            initialImage={initialImageUrl}
          />
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
            <Categories
              onChange={handleCategoryChange}
              defaultValue={formData.category}
            />
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
            <label className="block mb-2 font-medium">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              min="0"
              step="1"
              required
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
            {isLoading ? "Guardando..." : "Actualizar producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
