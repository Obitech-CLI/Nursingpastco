"use client";

import { SetStateAction, useActionState, useEffect, useState } from "react";
import { UnSubscribeUser } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const initialState = {
  msg: "",
  err: "",
};

type Props = {
  id: number;
  email: string;
  setUnsubscribing: React.Dispatch<SetStateAction<boolean>>;
};

export function UnSubscribe({ id, setUnsubscribing, email }: Props) {
  const [state, action, pending] = useActionState(
    UnSubscribeUser,
    initialState,
  );
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
            onClick={() => setUnsubscribing(false)}
          >
            <X />
          </button>
          <input type="hidden" name="id" defaultValue={id} />
          <input type="hidden" name="email" defaultValue={email} />
          <label>
            type in <strong>"i want to UnSubscribe"</strong>
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
