"use server";

import { supabase1 } from "./supabase/supabase1";

export const getNMCN = async (category?: string) => {
  try {
    if (!category) {
      return { error: "choose a course to see past questions" };
    }

    const { data, error } = await supabase1
      .from("nmcn")
      .select("id, title, category, pdf")
      .eq("category", category)
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
    return {
      error:
        "something went wrong. please check your internet connection and try again.",
    };
  }
};
