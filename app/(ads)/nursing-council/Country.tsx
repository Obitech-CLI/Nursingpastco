"use client";

import { NMCCountryType } from "@/app/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Country({ country }: { country: NMCCountryType }) {
  const router = useRouter();

  const handleView = (country: string, banner: string, description: string) => {
    router.push(
      `/nursing-council-pastQuestions?country=${country}&banner=${encodeURIComponent(banner)}&description=${encodeURIComponent(description)}`,
    );
  };
  return (
    <>
      <section>
        <h3>{country.country}</h3>
        <Image alt="" src={country.image} width={300} height={200} />
        <button
          type="button"
          onClick={() =>
            handleView(country.country, country.image, country.description)
          }
        >
          nmc{country.country.at(0)} past questions
        </button>
      </section>
    </>
  );
}
