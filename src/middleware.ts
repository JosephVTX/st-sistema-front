import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/"];
/* ss */
const publicPatterns = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".css",
  ".js",
  "/fonts/",
  "/images/",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Verificar archivos públicos primero
  const isPublicFile = publicPatterns.some(
    (pattern) => path.startsWith(pattern) || path.endsWith(pattern)
  );

  if (isPublicFile) {
    return NextResponse.next();
  }

  // Obtener el access_token
  const accessToken = request.cookies.get("access_token");

  // Verificar rutas públicas
  if (publicRoutes.includes(path)) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard/products", request.url));
    }
    return NextResponse.next();
  }

  // Verificar acceso a rutas protegidas
  if (!accessToken) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_static).*)"],
};
