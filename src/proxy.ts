import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/login",
    "/register",
    "/verify",
    "/message",
    "/api/auth",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const session = await auth();

  // Redirect logged-in users away from auth pages
  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protect private routes
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/api/:path*",
  ],
};