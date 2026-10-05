"use client";

import { useActionState, useEffect, useState } from "react";
import { LoginAdmin } from "./action";
import { Lock, User2 } from "lucide-react";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const initialState = { msg: "", err: "" };

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);
  const [state, action, pending] = useActionState(LoginAdmin, initialState);
  const { setErrorMsg } = useErrorModal();
  const { setSuccessMsg } = useSuccessModal();

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setFormData({
        username: "",
        password: "",
      });
      if (remember) {
        localStorage.setItem("remember", JSON.stringify(formData));
      } else {
        localStorage.removeItem("remember");
      }
      router.replace("/admin/dashboard");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  useEffect(() => {
    const stored = localStorage.getItem("remember");

    if (stored) {
      const res = JSON.parse(stored);
      setFormData({
        username: res.username,
        password: res.password,
      });
      setRemember(true);
    }
  }, []);

  return (
    <form action={action}>
      <h3>welcome back</h3>
      <label>
        <User2 />
        <input
          type="text"
          name="username"
          defaultValue={formData.username}
          placeholder="enter username"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </label>
      <label>
        <Lock />
        <input
          type="password"
          name="password"
          defaultValue={formData.password}
          placeholder="enter password"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </label>
      <div className="remember-me">
        <span>remember me</span>
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
      </div>
      <button type="submit" disabled={pending}>
        {pending ? "logging..." : "login"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
