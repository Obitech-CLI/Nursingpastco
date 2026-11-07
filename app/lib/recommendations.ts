"use server";

import { supabase0 } from "./supabase/supabase0";

export const getRecommendations = async (
  category?: string,
  search?: string,
  page?: string,
) => {
  const p = Number(page) || 1;
  const from = Number(p - 1) * 10;
  const to = from + 10 - 1;
  try {
    let query = supabase0
      .from("recommendations")
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch recommendations. try again" };
    }

    if (data.length === 0) {
      return {
        error: `no recommendation ${category ? "for " + category : ""} found
        ${search ? "no search result for " + search : ""}`,
      };
    }

    return { recommendations: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
