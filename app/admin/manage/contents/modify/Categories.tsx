"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@/app/types/types";
import { getContentsCategories } from "@/app/lib/categories";

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
      const res = await getContentsCategories();
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
    router.replace(`/admin/manage/contents/modify?${params}`);
  };

  const handleAll = () => {
    router.replace(`/admin/manage/contents/modify`);
  };

  return (
    <div className="select-categories">
      {!loading ? (
        <>
          {categories.length > 0 ? (
            <div className="categories">
              <button
                type="button"
                onClick={() => {
                  handleAll();
                  setCategory("");
                }}
              >
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
