"use client";

import { ChevronDown, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { InstitutionType } from "../../types/types";
import { getInstituitions } from "../../lib/instituitions";
import { getInstituition } from "../../lib/instituition";
import styles from "./styles.module.css";

export function SelectInstituition({
  instituition,
}: {
  instituition?: string;
}) {
  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [selectedInstituition, setSelectedInstituition] =
    useState<InstitutionType | null>(null);
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
    if (!instituition) return;
    const res = await getInstituition(instituition);
    if (res.instituition) {
      setSelectedInstituition(res.instituition);
      return;
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
    router.replace(`/nursing-midwifery-pastQuestions?${params}`);
  };
  return (
    <div className={styles.selectInstituition}>
      <div className={styles.instituition}>
        <h3 onClick={() => setShowInstituitions(!showInstituitions)}>
          {instituition ? instituition : "select instituition"}
          <ChevronDown />
        </h3>
        {selectedInstituition ? (
          <Image
            src={selectedInstituition.logo}
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
          <button
            type="button"
            className="cancel"
            onClick={() => setShowInstituitions(false)}
          >
            <X />
          </button>
          {Loading ? (
            <>
              <div className="loading">
                <p>loading instituitions...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            </>
          ) : (
            <>
              {instituitions.length > 0 && (
                <ul>
                  <h2>select instituition</h2>
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
              {instituitionError && instituitions.length === 0 ? (
                <>
                  <div className="retry">
                    <p>{instituitionError}</p>
                    <button type="button" onClick={fetchInstituitions}>
                      retry
                      <RotateCcw />
                    </button>
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}
