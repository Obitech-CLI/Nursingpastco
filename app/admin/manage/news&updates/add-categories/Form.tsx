"use client";

import { PenBox } from "lucide-react";
import { useActionState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { AddNewsCategories } from "./action";

const initialState = {
  err: "",
  msg: "",
};

export function AddCategoryForm() {
  const [state, action, pending] = useActionState(
    AddNewsCategories,
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
        <PenBox />
        <input type="text" name="category" placeholder="enter category..." />
      </label>
      <button type="submit">
        {pending ? "add" : "adding..."}
        {pending && <ClipLoader size={30} />}
      </button>
    </form>
  );
}
