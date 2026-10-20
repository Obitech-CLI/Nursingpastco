"use client";

import { useActionState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { AddNMCNCategories } from "./action";

const initialState = {
  err: "",
  msg: "",
};

export function AddCategoryForm() {
  const [state, action, pending] = useActionState(
    AddNMCNCategories,
    initialState,
  );

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

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
        category
        <input type="text" name="category" placeholder="enter category..." />
      </label>
      <button type="submit">
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={30} />}
      </button>
    </form>
  );
}
