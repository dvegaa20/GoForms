import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, request) => {
  const response = intlMiddleware(request);
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  return response;
});

export const config = {
  matcher: [
    "/",
    "/(en|es|fr)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
