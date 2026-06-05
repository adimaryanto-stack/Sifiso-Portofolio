import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  const isAdminRoute = pathname.startsWith("/admin") || pathname === "/admin";
  const isLoginRoute = pathname.startsWith("/login") || pathname === "/login";

  if (isAdminRoute && !isLoginRoute) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
