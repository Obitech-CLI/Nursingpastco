"use client";

import { useActionState, useEffect, useState } from "react";
import "./components.css";
import { Subscribe } from "./action";
import { useErrorModal, useSuccessModal } from "../contexts/modalContexts";

const initialState = {
  msg: "",
  ok: true || false,
};

export function SubscribeForm() {
  const [state, action, pending] = useActionState(Subscribe, initialState);
  const [email, setEmail] = useState("");

  const { setErrorMsg } = useErrorModal();
  const { setSuccessMsg } = useSuccessModal();
  const handleUnsubscribe = () => {
    if (!email) {
      setErrorMsg("enter your email address to unsubscribe");
      return;
    }
    const subject = encodeURIComponent("Unsubscribe Request");
    const body = encodeURIComponent(
      `Hello,
       Please unsubscribe me from your mailing list.
       My email: ${email}
       Thank you.`,
    );
    window.location.href = `mailto:yourcompany@example.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (state.ok) {
      setSuccessMsg(state.msg);
    }
    if (!state.ok) {
      setErrorMsg(state.msg);
    }
  }, [state]);
  return (
    <div className="subscribe-form">
      <h3>subscribe to our newsletter</h3>
      <p>get notified about any latest update on our webite</p>
      <form action={action}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="enter email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">
            {pending ? "subscribing..." : "subscribe"}
          </button>
          <button type="button" onClick={handleUnsubscribe}>
            unsubscribe
          </button>
        </div>
      </form>
    </div>
  );
}
