"use client";

import { useActionState } from "react";
import { CreateAdmin } from "./action";

const initialState = {
  error: "",
};

export function CreateForm() {
  const [state, action, pending] = useActionState(CreateAdmin, initialState);

  return (
    <form action={action}>
      <label>
        <input type="text" name="username" />
      </label>
      <label>
        <input type="email" name="email" />
      </label>
      <label>
        <input type="password" name="password" />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "creating..." : "create"}
      </button>

      {state.error && <p>{state.error}</p>}
    </form>
  );
}
