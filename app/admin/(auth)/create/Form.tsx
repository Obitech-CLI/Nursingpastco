"use client";

import { useActionState, useEffect, useState } from "react";
import { CreateAdmin } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, Lock, Mail, User2 } from "lucide-react";

const initialState = {
  err: "",
  msg: "",
};

export function CreateForm() {
  const [state, action, pending] = useActionState(CreateAdmin, initialState);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      router.replace("/admin/dashboard");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  return (
    <form action={action} className="auth">
      <h3>become an admin</h3>
      <label>
        <User2 />
        <input type="text" name="username" placeholder="enter username" />
      </label>
      <label>
        <Mail />
        <input type="email" name="email" placeholder="enter email" />
      </label>
      <label style={{ position: "relative" }}>
        <Lock />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="enter password"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "0.5rem",
            transform: "translateX(-50%)",
            display: "flex",
            height: "fit-content",
            alignItems: "center",
          }}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </span>
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "creating..." : "create"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
