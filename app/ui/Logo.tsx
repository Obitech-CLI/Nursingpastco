"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import DarkLogo from "@/public/DarkLogo.png";
import LightLogo from "@/public/LightLogo.png";

function LogoWithName() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Image
        src={DarkLogo}
        alt=""
        width={70}
        height={70}
        style={{ objectFit: "contain" }}
      />
    );

  return (
    <Image
      src={theme === "light" ? DarkLogo : LightLogo}
      alt=""
      width={70}
      height={70}
      style={{ objectFit: "contain" }}
    />
  );
}

export { LogoWithName };
