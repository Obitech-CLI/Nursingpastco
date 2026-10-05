"use server";

import { supabase } from "@/app/lib/supabase/supabase";

export const UnSubscribeUser = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm !== "i want to unsubscribe") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      return { err: "failed to unsubscribe user. try again", msg: "" };
    }
    return { msg: "unsubscribed successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
