"use client";

import { X } from "lucide-react";
import { SetStateAction, useActionState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { deleteContentsCategory } from "./action";
import { useRouter } from "next/navigation";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";

type Props = {
  id: number;
  setDeleting: React.Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  err: "",
  msg: "",
};
export function DeleteCategory({ id, setDeleting }: Props) {
  const [state, action, pending] = useActionState(
    deleteContentsCategory,
    initialState,
  );

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setDeleting(false);
      setSuccessMsg(state?.msg);
      router.refresh();
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <form action={action} className="delete-form">
      {!pending ? (
        <>
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
            }}
            onClick={() => setDeleting(false)}
          >
            <X />
          </button>
          <input type="hidden" name="id" defaultValue={id} />
          <label>
            type in <strong>"i want to delete"</strong>
            <input
              type="text"
              name="confirm"
              className="confirm"
              placeholder="enter confirm"
            />
          </label>

          <button type="submit">proceed</button>
        </>
      ) : (
        <div className="loading">
          <h3>deleting category...</h3>
          <ClipLoader size={50} color="var(--bg-txt)" />
          <p>hold on a bit</p>
        </div>
      )}
    </form>
  );
}
