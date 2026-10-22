"use server";

import { redis } from "./redis";
import { supabase2 } from "./supabase/supabase2";

export const getTextbooks = async () => {
  try {
    const cached = await redis.get("alltextbooks");
    if (cached) {
      return { textbooks: cached };
    }
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

    await redis.set("alltextbooks", data);

    return { textbooks: data };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again.",
      msg: "",
    };
  }
};
