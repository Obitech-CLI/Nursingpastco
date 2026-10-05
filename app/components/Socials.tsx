"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import "./components.css";

export function Socials() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.startsWith("/admin") && (
        <>
          <div className="socials">
            <div>
              <Link href="">
                <FaTiktok size={25} color="#000000" />
              </Link>
              <Link href="">
                <FaYoutube size={25} color="red" />
              </Link>
              <Link href="https://wa.me/2330592235166">
                <FaWhatsapp size={30} color="#00ff00" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
