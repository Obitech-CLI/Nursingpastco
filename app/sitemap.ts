import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nursingpastco.com",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://nursingpastco.com/nursing-instituitions",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://nursingpastco.com/nursing-pastQuestions",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://nursingpastco.com/nursing-courses",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://nursingpastco.com/nursing-contents",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://nursingpastco.com/nursing-news&updates",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://nursingpastco.com/nursing-recommendations",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://nursingpastco.com/about-us",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://nursingpastco.com/contact-us",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://nursingpastco.com/terms-and-condition",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://nursingpastco.com/privacy-policies",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
