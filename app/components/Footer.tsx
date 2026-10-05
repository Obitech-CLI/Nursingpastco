"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ObitechLogo from "@/public/Obitech Logo.png";
import "./components.css";
import { SubscribeForm } from "./Subscribe";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  return (
    <footer>
      {!pathname.startsWith("/admin") && (
        <>
          <SubscribeForm />
          <div className="info">
            <nav>
              <Link href="/about-us">about us</Link>
              <Link href="/contact-us">contact us</Link>
              <Link href="/terms-and-conditions">terms / conditions</Link>
              <Link href="/privacy-policies">privacy / policies</Link>
            </nav>
            <div className="sponsor">
              <span>
                powered by
                <br />
                <em>obitech</em>
              </span>

              <Image alt="" src={ObitechLogo} width={60} height={60} />
            </div>
            <div className="bottom">
              <p>
                Disclaimer: We are an independent resource and not affiliated
                with any official nursing body. Materials are for study purposes
                only.
              </p>
              <p style={{ margin: "0.5rem 0" }}>&copy; nursingpastco {year}</p>
            </div>
          </div>
        </>
      )}
      {pathname.startsWith("/admin") && (
        <p>&copy; nursingpastco {year}. all rights reserved</p>
      )}
    </footer>
  );
}
