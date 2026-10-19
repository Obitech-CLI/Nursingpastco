"use client";

import { useActionState, useEffect } from "react";
import { addNote } from "./action";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { ClipLoader } from "react-spinners";

const initialState = {
  err: "",
  msg: "",
};

export default function AddNoteForm() {
  const [state, action, pending] = useActionState(addNote, initialState);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

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
        uplaod note pdf
        <input type="file" name="pdf" accept="application/pdf" />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
