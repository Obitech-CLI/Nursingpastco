"use client";

import { useActionState, useEffect } from "react";
import { addInstituition } from "./action";
import { Image, Pen, PenBox } from "lucide-react";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { ClipLoader } from "react-spinners";

const initialState = {
  msg: "",
  ok: true || false,
};

export function AddForm() {
  const [state, action, pending] = useActionState(
    addInstituition,
    initialState,
  );
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  useEffect(() => {
    if (state.ok) {
      setSuccessMsg(state.msg);
    }
    if (!state.ok) {
      setErrorMsg(state.msg);
    }
  }, [state]);
  return (
    <form action={action}>
      <label>
        <PenBox size={30} />
        <input
          type="text"
          name="instituition-name"
          placeholder="enter instituition name"
        />
      </label>
      <label>
        <PenBox size={30} />
        <input
          type="text"
          name="instituition-abbr"
          placeholder="enter instituition abbr"
        />
      </label>
      <label>
        <Image size={30} />
        <input type="file" name="instituition-logo" accept="image/*" />
      </label>
      <label>
        <Pen size={25} />
        <textarea
          name="about-instituition"
          placeholder="briefly about instituition"
        />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
