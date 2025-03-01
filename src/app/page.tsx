"use client";

import { useActionState } from "react";
import Button from "@/components/ui/button";
import { login } from "@/actions/auth";
import { TriangleAlert } from "lucide-react";
import { cn } from "tr-cn";

export default function Page() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Sección del formulario */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
          <form action={action} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={"admin@admin.com"}
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={"password"}
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            {/* Mensaje de error */}
            <div
              className={cn(
                "bg-red-100 text-red-600 rounded-md flex justify-center text-sm items-center transition-all duration-500 ease-linear opacity-0 h-0",
                state?.message ? "opacity-100 h-10" : "opacity-0 h-0 m-0"
              )}
            >
              <TriangleAlert className="mr-2" size={16} />
              {state?.message}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full py-3 text-base font-medium disabled:opacity-50" disabled={pending}>
                  {
                    pending ? "Ingresando..." : "Ingresar"
                  }
              </Button>
            </div>
          </form>
        </div>

        {/* Sección de la imagen */}
        <div className="hidden md:block relative w-full h-auto">
          <img
            src="/images/grupo5.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
