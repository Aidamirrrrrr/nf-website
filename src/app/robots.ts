/** Генерация robots.txt для поисковых систем. */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://not-found.tech/sitemap.xml",
  };
}
