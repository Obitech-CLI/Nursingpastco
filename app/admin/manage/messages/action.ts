"use server";

import { supabase } from "@/app/lib/supabase/supabase";

export const DeleteMessage = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      return { err: "failed to delete message. try again", msg: "" };
    }
    return { msg: "message deleted successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
