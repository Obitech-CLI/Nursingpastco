"use client";

import { useEffect, useState } from "react";
import { CategoryType, NMCNType } from "../../types/types";
import { getNMCNCategories } from "../../lib/categories";
import { ChevronDown, RotateCcw } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";

export default function SelectCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getNMCNCategories();
      if (res.categories) {
        setCategories(res?.categories);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error(err);
      setError("something went wrong. try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    }
    router.replace(`/nursing-nmcnpastQuestions?${params}`);
    router.refresh();
  };

  return (
    <div className="select-categories">
      {!loading ? (
        <>
          {categories.length > 0 ? (
            <div className="categories">
              {categories.map((c) => (
                <button
                  type="button"
                  onClick={() => {
                    handleCategory(c.category);
                    setCategory(c.category);
                  }}
                  key={c.id}
                >
                  {c.category}
                  <ChevronDown />
                </button>
              ))}
            </div>
          ) : (
            <>
              {error && (
                <div className="retry">
                  <button type="button" onClick={fetchCategories}>
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
          <p>loading courses...</p>
          <ClipLoader size={50} color="var(--bg-txt)" />
        </div>
      )}
    </div>
  );
}
