"use server";

import axios from "@/libs/axios";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_: unknown, formData: FormData) {
  try {
    // 5 días
    const expiresAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    console.log("formData", formData.get("email"), formData.get("password"));

    const response = await axios({
      method: "POST",
      url: "/auth/login",
      data: formData,
    });

    // Configuración mejorada de cookies para asegurar accesibilidad en el cliente
    cookieStore.set("access_token", response.data.access_token, {
      httpOnly: false, // Debe ser false para que JavaScript pueda acceder
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: '/', // Asegura que la cookie esté disponible en toda la aplicación
      sameSite: "lax", // Mejor para la mayoría de los casos
    });

    redirect("/dashboard/products");
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        console.log("error", error);

        // Errores específicos de validación de Laravel
        if (status === 422) {
          const validationErrors = data.errors;
          const firstError = Object.values(validationErrors)[0];
          return {
            message: Array.isArray(firstError)
              ? firstError[0]
              : "Error de validación",
          };
        }

        // Mapa de mensajes de error comunes
        const errorMessages: Record<number, string> = {
          401: "Las credenciales ingresadas son incorrectas",
          403: "No tienes permiso para acceder",
          404: "Recurso no encontrado",
          429: "Demasiados intentos, por favor espera un momento",
          500: "Error en el servidor, intenta más tarde",
          503: "Servicio no disponible temporalmente",
        };

        return {
          message: errorMessages[status] || "Ha ocurrido un error inesperado",
        };
      }

      if (error.request) {
        return {
          message: "No se pudo conectar con el servidor.",
        };
      }

      return {
        message: "Error al procesar la solicitud",
      };
    }

    throw error;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/");
}

export async function getUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token");

  const response = await axios({
    method: "POST",
    url: "/auth/me",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response.status === 200 ? response.data : null;
}
