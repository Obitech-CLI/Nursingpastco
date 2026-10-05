"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SetStateAction, useActionState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { DeleteMessage } from "./action";

const initialState = {
  msg: "",
  err: "",
};

type Props = {
  id: number;
  setDeleting: React.Dispatch<SetStateAction<boolean>>;
};

export function DeleteButton({ id, setDeleting }: Props) {
  const [state, action, pending] = useActionState(DeleteMessage, initialState);
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
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
            type in <strong>"i want to Delete"</strong>
            <input
              type="text"
              name="confirm"
              className="confirm"
              placeholder="enter confirm"
            />
          </label>

          <button type="submit" disabled={pending}>
            proceed
          </button>
        </>
      ) : (
        <div className="loading">
          <h3>unsubscribing...</h3>
          <ClipLoader size={50} color="var(--bg-txt)" />
          <p>hold on a bit</p>
        </div>
      )}
    </form>
  );
}
