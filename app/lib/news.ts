"use server";

import { supabase0 } from "./supabase/supabase0";

export const getNews = async (category?: string, search?: string) => {
  try {
    let query = supabase0
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch news&updates. try again" };
    }

    if (data.length === 0) {
      return { error: "no news&updates found" };
    }

    return { news: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
