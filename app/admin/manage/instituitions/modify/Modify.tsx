"use client";

import { useActionState, useEffect, useState } from "react";
import { DeleteForm } from "./Delete";
import { updateInstituition } from "./action";
import Image from "next/image";
import { Delete, PenBox, PlusCircle, X } from "lucide-react";
import {
  useConfirmModal,
  useErrorModal,
  useSuccessModal,
} from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { InstitutionType } from "@/app/types/types";

type Props = {
  instituition: InstitutionType;
};

const initialState = {
  msg: "",
  err: "",
};

export function ModifyInstituition({ instituition }: Props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [state, action, pending] = useActionState(
    updateInstituition,
    initialState,
  );
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setEditing(false);
      setSuccessMsg(state.msg);
      router.refresh();
    }
    if (state.err) {
      setErrorMsg(state.msg);
    }
  }, [state]);

  return (
    <>
      <form key={instituition.id} action={action} className="edit">
        <input
          type="hidden"
          name="instituition-id"
          value={editing ? Number(instituition.id) : ""}
        />
        <label>
          <Image
            src={instituition.logo}
            alt=""
            width={100}
            height={100}
            loading="eager"
          />
          {editing && (
            <input type="file" name="instituition-logo" defaultValue="" />
          )}
          <span
            style={{
              borderRadius: "50%",
            }}
          >
            <PlusCircle size={30} />
          </span>
        </label>
        <div>
          <label>
            <input
              style={{ textTransform: "uppercase" }}
              className={editing ? "editing" : ""}
              type="text"
              name="instituition-abbr"
              defaultValue={instituition.abbr ?? ""}
              disabled={!editing}
            />
          </label>
          <label>
            <input
              className={editing ? "editing" : ""}
              type="text"
              name="instituition-name"
              defaultValue={instituition.name ?? ""}
              disabled={!editing}
            />
          </label>

          <label>
            <textarea
              className={editing ? "editing" : ""}
              name="about-instituition"
              defaultValue={instituition.about ?? ""}
              disabled={!editing}
            />
          </label>
        </div>

        <div className="edit-btn" style={{ borderRadius: "50px" }}>
          <button
            type="button"
            onClick={() => setDeleting(true)}
            disabled={editing}
          >
            <Delete size={25} color="red" />
            delete
          </button>
          <button onClick={() => setEditing(!editing)} type="button">
            {editing ? <X color="red" /> : <PenBox color="blue" />}
            {editing ? "cancel" : "edit"}
          </button>
        </div>

        {editing && (
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
          </button>
        )}
      </form>
      {deleting && (
        <DeleteForm
          id={instituition.id}
          editing={editing}
          deleting={deleting}
          setDeleting={setDeleting}
        />
      )}
    </>
  );
}
