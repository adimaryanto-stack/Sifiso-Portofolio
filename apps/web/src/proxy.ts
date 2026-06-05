import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { auth } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';

type Session = typeof auth.$Infer.Session;

const intlMiddleware = createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en'
});

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/login")) {
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

  // Handle i18n for public routes (skip API, Admin, and Login)
  if (!pathname.startsWith("/api") && !pathname.startsWith("/admin") && !pathname.startsWith("/login")) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
