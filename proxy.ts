// proxy.ts (Next.js 16+)
import { NextResponse, type NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

export async function proxy(request: NextRequest) {
  const { data } = await betterFetch<{
    session: Record<string, unknown>;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: { cookie: request.headers.get("cookie") || "" },
  });

  const pathname = request.nextUrl.pathname;

  // 1. Unauthenticated users get kicked to login
  if (!data || !data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // 2. Strict Admin-Only Area (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      // If a regular user or manager tries to enter /admin, kick them out
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // If they ARE an admin, do nothing! Let them through to the page.
    return NextResponse.next();
  }

  // 3. Shared Area (/dashboard/*)
  if (pathname.startsWith("/dashboard")) {
    if (!["user", "admin", "manager"].includes(role)) {
      // If their role isn't recognized, kick them out
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // If they have a valid role, let them through!
    return NextResponse.next();
  }

  // If it's any other route caught by the matcher, let them through
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
