"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InstitutionType } from "../nursing-instituitions/Instituitions";
import { getInstituitions } from "../lib/instituitions";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./pastQuestions.module.css";

export function SearchInstituition({
  instituition,
}: {
  instituition?: string;
}) {
  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [selectedInstituition, setSelectedInstituition] = useState<
    InstitutionType[]
  >([]);
  const [Loading, setLoading] = useState(false);
  const [instituitionError, setInstituitionError] = useState("");
  const [showInstituitions, setShowInstituitions] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchInstituitions = async () => {
    try {
      setLoading(true);
      const res = await getInstituitions();
      if (res.instituitions) {
        setInstituitions(res.instituitions);
        return;
      }
      if (res.error) {
        setInstituitionError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstituition = async () => {
    try {
      if (!instituition) return;
      const res = await getInstituitions(instituition);
      if (res.instituitions) {
        setSelectedInstituition(res.instituitions);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInstituition();
  }, [instituition]);

  useEffect(() => {
    fetchInstituitions();
  }, []);

  const handleSearch = (instituition: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("instituition", instituition);
    router.replace(`/nursing-pastQuestions?${params}`);
  };
  return (
    <div className={styles.searchInstituition}>
      <div className={styles.instituition}>
        <div onClick={() => setShowInstituitions(!showInstituitions)}>
          {instituition ? instituition : "select instituition"}
          <ChevronDown />
        </div>
        {instituition && selectedInstituition.length ? (
          <Image
            src={selectedInstituition[0].logo}
            alt=""
            width={200}
            height={200}
            loading="eager"
          />
        ) : (
          <div className={styles.dummy}></div>
        )}
      </div>
      {showInstituitions && (
        <div className="select">
          {Loading ? (
            <p>loading instituitions...</p>
          ) : (
            <>
              {instituitions.length > 0 && (
                <ul>
                  <h3>select instituition</h3>
                  {instituitions.map((i) => (
                    <li
                      key={i.id}
                      onClick={() => {
                        handleSearch(i.name);
                        setShowInstituitions(!showInstituitions);
                      }}
                    >
                      {i.name}
                    </li>
                  ))}
                </ul>
              )}
              {instituitionError && (
                <div>
                  <p>{instituitionError}</p>
                  <button type="button" onClick={fetchInstituitions}>
                    retry
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
