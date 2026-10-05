"use server";

import { supabase } from "../lib/supabase/supabase";

export const SendMessage = async (prevData: any, formData: FormData) => {
  const fullname = formData.get("fullname") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  try {
    if (!fullname || !email || !message) {
      return { err: "empty input detected", msg: "" };
    }

    const { error } = await supabase.from("messages").insert({
      fullname: fullname,
      email: email,
      message: message,
    });

    if (error) {
      return { err: "something went wrong. try again", msg: "" };
    }

    return { msg: "message sent successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
