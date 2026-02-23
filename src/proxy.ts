import { type NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["ru", "en"] as const;
const COOKIE_NAME = "locale";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // If locale cookie already exists, skip detection
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing && SUPPORTED_LOCALES.includes(existing as "ru" | "en")) {
    return response;
  }

  // Detect from Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  const detected = parseAcceptLanguage(acceptLang);

  response.cookies.set(COOKIE_NAME, detected, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return response;
}

function parseAcceptLanguage(header: string): "ru" | "en" {
  const languages = header
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    if (lang.startsWith("ru")) return "ru";
    if (lang.startsWith("en")) return "en";
  }

  return "ru";
}

export const config = {
  matcher: ["/"],
};
