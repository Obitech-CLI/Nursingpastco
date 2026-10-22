"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");

    script.async = true;
    script.src = "https://embed.tawk.to/6ad9586844603034b5c8522f/1k5gg2men";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);
  return null;
}
