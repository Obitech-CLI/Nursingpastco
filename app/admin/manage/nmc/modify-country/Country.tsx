"use client";

import { NMCCountryType } from "@/app/types/types";
import { Delete, Edit2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { updateNMCCountry } from "./action";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const initialState = {
  err: "",
  msg: "",
};

export default function Country({ country }: { country: NMCCountryType }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [state, action, pending] = useActionState(
    updateNMCCountry,
    initialState,
  );

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setEditing(false);
      router.refresh();
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <>
      <section>
        <h3>{country.country}</h3>
        <Image alt="" src={country.image} width={100} height={100} />
        <p>{country.description}</p>
        <div>
          <button type="button" onClick={() => setEditing(true)}>
            <Edit2 color="blue" />
          </button>
          <button type="button">
            <Delete color="red" />
          </button>
        </div>
      </section>
      {editing && (
        <form className="edit-form">
          <button
            type="button"
            className="cancel"
            onClick={() => setEditing(false)}
          >
            <X />
          </button>
          <h3>update nmc country</h3>
          <input type="hidden" name="id" defaultValue={country.id} />
          <label>
            nmc country
            <input
              type="text"
              name="country"
              defaultValue={country.country}
              placeholder="enter nmc country name..."
            />
          </label>
          <label>
            nmc image
            <input type="file" name="image" accept="image/*" />
          </label>
          <label>
            nmc description
            <textarea
              name="description"
              defaultValue={country.description}
              placeholder="enter nmc description..."
            />
          </label>
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
            {pending && <ClipLoader size={20} />}
          </button>
        </form>
      )}
    </>
  );
}
