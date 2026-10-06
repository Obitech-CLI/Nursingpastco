"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { getInstituitions } from "@/app/lib/instituitions";
import { InstitutionType } from "@/app/types/types";
import { selectLevels } from "@/app/ui/Options";
import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export function SearchAdminCourses() {
  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [searchInstituition, setSearchInstituition] = useState("");
  const [searchLevel, setSearchLevel] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const [iLoading, setILoading] = useState(false);
  const [instituitionError, setInstituitionError] = useState("");
  const [showInstituitions, setShowInstituitions] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  const { setShowSearch } = useSearch();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInstituition) {
      params.set("instituition", searchInstituition);
    }
    if (searchLevel) {
      params.set("level", searchLevel);
    }
    router.replace(`/admin/manage/courses/modify?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.push(`/admin/manage/courses/modify`);
    setSearchInstituition("");
    setSearchLevel("");
    setShowSearch(false);
  };

  const fetchInstituitions = async () => {
    try {
      setILoading(true);
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
      setILoading(false);
    }
  };

  useEffect(() => {
    fetchInstituitions();
  }, []);

  return (
    <fieldset>
      <h3>search courses</h3>
      <button type="button" onClick={handleAll}>
        all
      </button>
      <label>
        <button
          type="button"
          onClick={() => setShowInstituitions(!showInstituitions)}
        >
          {searchInstituition ? searchInstituition : "select instituition"}
          <ChevronDown />
        </button>
        {showInstituitions && (
          <div className="select">
            {iLoading ? (
              <div className="loading">
                <p>loading instituitions...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            ) : (
              <>
                {instituitions.length > 0 && (
                  <>
                    <h2>select instituition</h2>
                    <ul>
                      {instituitions.map((i) => (
                        <li
                          key={i.id}
                          onClick={() => setSearchInstituition(i.name)}
                        >
                          {i.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {instituitionError && (
                  <div className="retry">
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
      </label>
      <label>
        <button type="button" onClick={() => setShowLevels(!showLevels)}>
          {searchLevel ? searchLevel : "select level"}
          <ChevronDown />
        </button>
        {showLevels && (
          <>
            <div className="select">
              <h2>select level</h2>
              <ul>
                {selectLevels.map((l) => (
                  <li key={l.id} onClick={() => setSearchLevel(l.level)}>
                    {l.level}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </label>
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
