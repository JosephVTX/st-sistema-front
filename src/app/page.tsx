"use client";

import { useActionState } from "react";
import Button from "@/components/ui/button";
import { login } from "@/actions/auth";
import { TriangleAlert } from "lucide-react";
import { cn } from "tr-cn";

export default function Page() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <form
          action={action}
          className="bg-secondary p-6 rounded-2xl space-y-5"
        >
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={"admin@admin.com"}
              className="w-full p-3 rounded-xl bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full p-3 rounded-xl bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div
            className={cn(
              "bg-red-100 text-red-600 rounded-md flex justify-center text-sm items-center transition-all duration-500 ease-linear opacity-0 h-0",
              state?.message && "opacity-100 h-10"
            )}
          >
            <TriangleAlert className="mr-2" size={16} />
            {state?.message}
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full py-3 text-base font-medium">
              Ingresar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
