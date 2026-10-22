import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/coming-soon"],
    },
    sitemap: "https://nursingpastco.com/sitemap.xml",
  };
}
