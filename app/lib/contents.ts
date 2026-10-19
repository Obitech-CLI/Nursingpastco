"use server";

import { supabase0 } from "./supabase/supabase0";

export const getContents = async (category?: string, search?: string) => {
  try {
    let query = supabase0
      .from("contents")
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
      return { error: "failed to fetch contents. try again" };
    }

    if (data.length === 0) {
      return { error: "no content found" };
    }

    return { contents: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
