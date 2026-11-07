"use client";

import { useActionState, useEffect, useState } from "react";
import { AddNMCCountry } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";

const initialState = {
  err: "",
  msg: "",
};

export default function AddCountryForm() {
  const [state, action, pending] = useActionState(AddNMCCountry, initialState);
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
        nmc country
        <input
          type="text"
          name="country"
          placeholder="enter nmc country name..."
        />
      </label>
      <label>
        nmc image
        <input type="file" name="image" accept="image/*" />
      </label>
      <label>
        nmc description
        <textarea name="description" placeholder="enter nmc description..." />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={20} />}
      </button>
    </form>
  );
}
