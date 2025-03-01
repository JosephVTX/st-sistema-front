"use client";

import { useState, useRef } from "react";
import { X, Upload, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  initialImage?: string;
  onChange: (imageUrl: string) => void;
}

export default function ImageUpload({ initialImage = "", onChange }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageUrl = event.target?.result as string;
        setImageUrl(newImageUrl);
        onChange(newImageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkSubmit = () => {
    if (linkInput) {
      setImageUrl(linkInput);
      onChange(linkInput);
      setIsLinkMode(false);
      setLinkInput("");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    onChange("");
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageUrl = event.target?.result as string;
        setImageUrl(newImageUrl);
        onChange(newImageUrl);
      };
      reader.readAsDataURL(file);
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
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} rounded-lg p-8 mb-4 flex flex-col items-center justify-center h-64`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-center mb-2">Arrastra una imagen o haz clic para seleccionar</p>
          <p className="text-gray-400 text-sm text-center">PNG, JPG, GIF hasta 5MB</p>
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
            onClick={handleLinkSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            Añadir
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border border-gray-300 bg-white rounded py-2 px-4 text-center text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Seleccionar archivo
          </button>
          <button 
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