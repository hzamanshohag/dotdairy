// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((request) => {
//   const isLoggedIn = !!request.auth;

//   const pathname = request.nextUrl.pathname;

//   // Protect only admin pages
//   const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

//   // Redirect unauthenticated users to login
//   if (isAdminRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/admin", "/admin/:path*"],
// };
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const pathname = request.nextUrl.pathname;

  // Protect all admin routes
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  // Not logged in → login
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in + visiting /admin → dashboard
  if (pathname === "/admin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};