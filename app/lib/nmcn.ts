"use server";

import { redis } from "./redis";
import { supabase1 } from "./supabase/supabase1";

export const getNMCN = async (category?: string) => {
  try {
    if (!category) {
      return { error: "choose a course to see past questions" };
    }

    const cached = await redis.get(`nmcnQuestions:${category}`);

    if (cached) {
      return { nmcn: cached };
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

    await redis.set(`nmcnQuestions:${category}`, data);

    return { nmcn: data };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again.",
      msg: "",
    };
  }
};
