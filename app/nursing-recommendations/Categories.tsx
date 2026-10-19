"use client";

import { useEffect, useState } from "react";
import { CategoryType } from "../types/types";
import { getRecommendationsCategories } from "../lib/categories";
import { RotateCcw } from "lucide-react";
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
      const res = await getRecommendationsCategories();
      if (res.categories?.length) {
        setCategories(res.categories);
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
    router.replace(`/nursing-recommendations?${params}`);
  };

  const handleAll = () => {
    router.replace(`/nursing-recommendations`);
  };

  return (
    <div className="select-categories">
      {!loading ? (
        <>
          {categories.length > 0 ? (
            <div className="categories">
              <button type="button" onClick={handleAll}>
                all
              </button>
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    handleCategory(c.category);
                    setCategory(c.category);
                  }}
                  className={c.category === category ? "active" : ""}
                >
                  {c.category}
                </button>
              ))}
            </div>
          ) : (
            <>
              {error && (
                <div className="cat-retry">
                  <button type="button" onClick={fetchCategories}>
                    <RotateCcw size={25} />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="cat-loading">
          <ClipLoader size={30} color="var(--bg-txt)" />
        </div>
      )}
    </div>
  );
}
