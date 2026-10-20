"use client";

import { useActionState, useEffect, useState } from "react";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { ClipLoader } from "react-spinners";
import { addNMCN } from "./action";
import { getNMCNCategories } from "@/app/lib/categories";
import { CategoryType } from "@/app/types/types";
import { ChevronDown, RotateCcw } from "lucide-react";

const initialState = {
  err: "",
  msg: "",
};

export default function AddNMCNForm() {
  const [state, action, pending] = useActionState(addNMCN, initialState);
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
      const res = await getNMCNCategories();
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
    if (state.msg) {
      setSuccessMsg(state.msg);
    }
    if (state.err) {
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
                    <h2>select categories</h2>
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
        upload nmcn pdf
        <input type="file" name="pdf" accept="application/pdf" />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
