"use server";

import { TextbookType } from "../types/types";
import { redis } from "./redis";
import { supabase2 } from "./supabase/supabase2";

export const getTextbooks = async () => {
  try {
    const { data, error } = await supabase2
      .from("textbooks")
      .select("id, title, pdf, cover")
      .order("created_at", { ascending: true });

    if (error) {
      return { error: "something went wrong. try again" };
    }

    if (data.length === 0) {
      return { error: "no textbook found" };
    }

    return { textbooks: data };
  } catch (err) {
    console.error(err);
    return {
      error:
        "something went wrong. please check your internet connection and try again.",
    };
  }
};
