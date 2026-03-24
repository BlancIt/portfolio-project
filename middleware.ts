import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();

  const duration = Date.now() - start;
  const log = {
    timestamp: new Date().toISOString(),
    method: request.method,
    path: request.nextUrl.pathname,
    userAgent: request.headers.get("user-agent") || "unknown",
    ip: request.headers.get("x-forwarded-for") || request.ip || "unknown",
    duration: `${duration}ms`,
  };

  console.log(JSON.stringify(log));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|riv|json|lottie)$).*)",
  ],
};
