"use client";

import { getRecommendationsCategories } from "@/app/lib/categories";
import { CategoryType } from "@/app/types/types";
import { ChevronDown, RotateCcw } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { addRecommendations } from "./action";

const initialState = {
  err: "",
  msg: "",
};

export function AddRecommendationsForm() {
  const [state, action, pending] = useActionState(
    addRecommendations,
    initialState,
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

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

  useEffect(() => {
    if (state?.msg) {
      setSuccessMsg(state.msg);
    }
    if (state?.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <form action={action}>
      <label>
        <input type="hidden" name="category" defaultValue={selectedCategory} />
        <button
          type="button"
          onClick={() => setShowCategories(!showCategories)}
        >
          {selectedCategory ? selectedCategory : "select a category"}
          <ChevronDown />
        </button>
        {showCategories && (
          <div className="select">
            {!loading ? (
              <>
                {categories.length > 0 ? (
                  <ul>
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        onClick={() => setSelectedCategory(category.category)}
                      >
                        {category.category}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {error && (
                      <div className="retry">
                        <p>{error}</p>
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
                <p>loading categories...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
          </div>
        )}
      </label>
      <label>
        title
        <input type="title" name="title" placeholder="enter title..." />
      </label>
      <label>
        image
        <input type="file" name="image" />
      </label>
      <label>
        recommendation
        <textarea name="recommendation" placeholder="enter recommendation..." />
      </label>
      <label>
        link
        <input type="text" name="link" placeholder="enter link..." />
      </label>
      <button type="submit">
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
