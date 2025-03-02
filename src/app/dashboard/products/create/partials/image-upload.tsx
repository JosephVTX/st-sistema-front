"use client";

import { useState, useRef } from "react";
import { X, Upload, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  initialImage?: string;
  onChange: (file: File | null) => void;
}

export default function ImageUpload({
  initialImage = "",
  onChange,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndConvertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Crear un canvas para comprimir y convertir la imagen
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Mantener las dimensiones originales pero limitar a un máximo razonable
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Dibujar la imagen en el canvas
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convertir a WebP con compresión (0.8 = 80% de calidad)
          canvas.toBlob((blob) => {
            if (blob) {
              // Crear un nuevo archivo con el blob WebP
              const webpFile = new File([blob], file.name.split('.')[0] + '.webp', {
                type: 'image/webp',
              });
              resolve(webpFile);
            } else {
              reject(new Error('Error al convertir la imagen a WebP'));
            }
          }, 'image/webp', 0.8);
        };
        img.onerror = () => reject(new Error('Error al cargar la imagen'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Mostrar la vista previa de la imagen original
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImageUrl = event.target?.result as string;
          setImageUrl(newImageUrl);
        };
        reader.readAsDataURL(file);
        
        // Comprimir y convertir a WebP
        const optimizedFile = await compressAndConvertToWebP(file);
        onChange(optimizedFile);
      } catch (error) {
        console.error("Error al optimizar la imagen:", error);
        onChange(file); // Fallback a la imagen original
      }
    }
  };

  const handleLinkSubmit = async () => {
    if (linkInput) {
      setImageUrl(linkInput);
      
      try {
        // Descargar la imagen desde la URL
        const response = await fetch(linkInput);
        const blob = await response.blob();
        
        // Crear un archivo temporal
        const tempFile = new File([blob], "image-from-url.jpg", {
          type: blob.type,
        });
        
        // Comprimir y convertir a WebP
        const optimizedFile = await compressAndConvertToWebP(tempFile);
        onChange(optimizedFile);
      } catch (error) {
        console.error("Error al procesar la imagen desde URL:", error);
        setImageUrl(linkInput);
        // No debemos pasar null, intentamos usar la imagen original como fallback
        try {
          const response = await fetch(linkInput);
          const blob = await response.blob();
          const fallbackFile = new File([blob], "image-from-url-fallback.jpg", {
            type: blob.type,
          });
          onChange(fallbackFile);
        } catch (secondError) {
          console.error("Error en fallback de imagen:", secondError);
          onChange(null);
        }
      }
      
      setIsLinkMode(false);
      setLinkInput("");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      try {
        // Mostrar la vista previa de la imagen original
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImageUrl = event.target?.result as string;
          setImageUrl(newImageUrl);
        };
        reader.readAsDataURL(file);
        
        // Comprimir y convertir a WebP
        const optimizedFile = await compressAndConvertToWebP(file);
        onChange(optimizedFile);
      } catch (error) {
        console.error("Error al optimizar la imagen:", error);
        onChange(file); // Fallback a la imagen original
      }
    }
  };

  return (
    <div className="w-full">
      {imageUrl ? (
        <div className="relative mb-4">
          <img
            src={imageUrl}
            alt="Product preview"
            className="w-full h-64 object-contain border rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed ${
            isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
          } rounded-lg p-8 mb-4 flex flex-col items-center justify-center h-64`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-center mb-2">
            Arrastra una imagen o haz clic para seleccionar
          </p>
          <p className="text-gray-400 text-sm text-center">
            PNG, JPG, GIF hasta 5MB
          </p>
        </div>
      )}

      {isLinkMode ? (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Pega la URL de la imagen"
            className="w-full border border-gray-300 rounded p-2"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleLinkSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            Añadir
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border border-gray-300 bg-white rounded py-2 px-4 text-center text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Seleccionar archivo
          </button>
          <button
            type="button"
            onClick={() => setIsLinkMode(true)}
            className="flex items-center justify-center border border-gray-300 bg-white rounded py-2 px-4 text-center text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <LinkIcon size={16} className="mr-1" />
            URL
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
