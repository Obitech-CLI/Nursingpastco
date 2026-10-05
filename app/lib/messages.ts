"use server";

import { Admin } from "./admin";
import { supabase } from "./supabase/supabase";

export const getMessages = async () => {
  await Admin();
  try {
    let query = supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch messages. try again" };
    }

    if (data.length === 0) {
      return { error: "no message found" };
    }

    return { messages: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
