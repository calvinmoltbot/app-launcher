export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    // Protect everything except auth routes, static files, and API sync
    "/((?!api/auth|_next/static|_next/image|favicon.ico|icons|manifest.webmanifest|sw.js|\\.launcher\\.json).*)",
  ],
};
