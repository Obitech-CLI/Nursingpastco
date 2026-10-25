"use client";

import { CategoryType } from "@/app/types/types";
import { Delete, Edit2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { updateNewsCategory } from "./action";
import { DeleteCategory } from "./Delete";

type Props = {
  category: CategoryType;
};

const initialState = {
  err: "",
  msg: "",
};

export function Category({ category }: Props) {
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [state, action, pending] = useActionState(
    updateNewsCategory,
    initialState,
  );

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  useEffect(() => {
    if (state?.msg) {
      setSuccessMsg(state.msg);
      setEdit(false);
      router.refresh();
    }
    if (state?.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <>
      <form action={action}>
        <input type="hidden" name="id" defaultValue={category.id} />
        <label>
          <h3>{category.category}</h3>
          {edit && (
            <input
              type="text"
              name="category"
              defaultValue={category.category}
            />
          )}
          <div>
            <button type="button" onClick={() => setEdit(!edit)}>
              <Edit2 color="blue" size={25} />
              {edit ? "cancel" : "edit"}
            </button>
            <button
              type="button"
              disabled={edit}
              onClick={() => setDeleting(true)}
            >
              <Delete size={25} color="red" />
              delete
            </button>
          </div>
        </label>
        {edit && (
          <button type="submit">
            {pending ? "updating..." : "update"}
            {pending && <ClipLoader size={25} />}
          </button>
        )}
      </form>
      {deleting && (
        <DeleteCategory setDeleting={setDeleting} id={category.id} />
      )}
    </>
  );
}
