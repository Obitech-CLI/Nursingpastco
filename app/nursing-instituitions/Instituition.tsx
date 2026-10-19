"use client";

import Image from "next/image";
import { InstitutionType } from "./Instituitions";
import { BookOpen, Clipboard } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  instituition: InstitutionType;
};

export function Instituition({ instituition }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCourses = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("instituition", instituition.name);

    router.replace(`/nursing-courses?${params}`);
  };
  const handleInstituition = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("instituition", instituition.name);

    router.replace(`/nursing-pastQuestions?${params}`);
  };
  return (
    <article>
      <h2>{instituition.abbr}</h2>
      <Image
        src={instituition.logo}
        alt=""
        width={200}
        height={200}
        loading="eager"
      />
      <h3>{instituition.name}</h3>
      <p>{instituition.about}</p>
      <div>
        <button type="button" onClick={handleCourses}>
          <BookOpen />
          courses
        </button>
        <button type="button" onClick={handleInstituition}>
          <Clipboard />
          pastQuestions
        </button>
      </div>
    </article>
  );
}
