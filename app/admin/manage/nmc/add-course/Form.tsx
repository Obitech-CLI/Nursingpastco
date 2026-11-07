"use client";

import { useActionState, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { AddNMCCourse } from "./action";
import { NMCCountryType } from "@/app/types/types";
import { ChevronDown, RotateCcw } from "lucide-react";
import { getNMCCountries } from "@/app/lib/categories";

const initialState = {
  err: "",
  msg: "",
};

export default function AddCourseForm() {
  const [state, action, pending] = useActionState(AddNMCCourse, initialState);
  const [countries, setCountries] = useState<NMCCountryType[]>([]);
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setSelectedCountry("");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

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
  return (
    <form action={action} className="auth">
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
                <p>loading categories...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
          </div>
        )}
      </label>
      <label>
        course
        <input type="text" name="course" placeholder="enter nmc course..." />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={20} />}
      </button>
    </form>
  );
}
