"use server";

import { supabase1 } from "./supabase/supabase1";

export const getNMCN = async () => {
  try {
    const { data, error } = await supabase1
      .from("nmcn")
      .select("id, title, pdf")
      .order("created_at", { ascending: true });

    if (error) {
      return { error: "something went wrong. try again" };
    }

    if (data.length === 0) {
      return { error: "no nmcn pastquestion found" };
    }

    return { nmcn: data };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
