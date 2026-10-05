"use server";

import { supabase } from "./supabase/supabase";

export const getPastQuestionsCount = async () => {
  try {
    let query = supabase
      .from("pastQuestions")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return { error: "something went wrong" };
    }

    return { count: data.length };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
