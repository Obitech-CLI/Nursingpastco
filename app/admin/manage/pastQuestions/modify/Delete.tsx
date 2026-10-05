"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { SetStateAction, useActionState, useEffect } from "react";
import { deletePastQuestion } from "./action";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";

type Props = {
  id: number;
  editing: boolean;
  deleting: boolean;
  setDeleting: React.Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  msg: "",
  err: "",
};

export function DeleteForm({ id, setDeleting, editing }: Props) {
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const [state, action, pending] = useActionState(
    deletePastQuestion,
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.msg) {
      setDeleting(false);
      setSuccessMsg(state?.msg);
      router.refresh();
      return;
    }
    if (state?.err) {
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

          <button type="submit" disabled={editing}>
            proceed
          </button>
        </>
      ) : (
        <div className="loading">
          <h3>deleting pastQuestion...</h3>
          <ClipLoader size={50} color="var(--bg-txt)" />
          <p>hold on a bit</p>
        </div>
      )}
    </form>
  );
}
