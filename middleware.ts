import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);
const publicPaths = ["/sign-in", "/sign-up", "/"];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const response = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;
  const cleanPath = pathname.replace(/^\/(en|es|fr)/, "") || "/";

  const isPublic = publicPaths.some((path) => {
    const regex = new RegExp(`^${path.replace("(.*)", ".*")}$`);
    return regex.test(cleanPath);
  });

  if (!isPublic) {
    const redirectUrl = `${req.nextUrl.origin}/sign-in`;
    const protectResponse = await auth.protect({
      unauthenticatedUrl: redirectUrl,
      unauthorizedUrl: redirectUrl,
    });

    if (protectResponse instanceof NextResponse) {
      return protectResponse;
    }
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next).*)", // Excluye rutas que empiezan con /api, archivos, etc.
    "/(trpc)(.*)",
    "/(en|es|fr)(/.*)", // Permite las rutas con prefijos de idioma
  ],
};
