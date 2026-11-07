"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { getNMCCountries } from "@/app/lib/categories";
import { getNMCCourses } from "@/app/lib/nmc";
import { NMCCountryType, NMCCourseType } from "@/app/types/types";
import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export function SelectNMCCourses() {
  const [countries, setCountries] = useState<NMCCountryType[]>([]);
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const { setShowSearch } = useSearch();

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getNMCCountries();
      if (res.countries) {
        setCountries(res.countries);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCountry) {
      params.set("country", selectedCountry);
    }
    router.replace(`/admin/manage/nmc/modify-course?${params}`);
    setShowSearch(false);
  };
  return (
    <fieldset>
      <h4>search nmc course</h4>
      <label>
        <input type="hidden" name="country" defaultValue={selectedCountry} />
        <button type="button" onClick={() => setShowCountries(!showCountries)}>
          {selectedCountry ? selectedCountry : "select a country"}
          <ChevronDown />
        </button>
        {showCountries && (
          <div className="select">
            <h2>choose nmc country</h2>
            {!loading ? (
              <>
                {countries.length > 0 ? (
                  <ul>
                    {countries.map((country) => (
                      <li
                        key={country.id}
                        onClick={() => setSelectedCountry(country.country)}
                      >
                        {country.country}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {error && (
                      <div className="retry">
                        <p>{error}</p>
                        <button type="button" onClick={fetchCountries}>
                          retry
                          <RotateCcw size={25} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="loading">
                <p>loading countries...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
          </div>
        )}
      </label>
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
