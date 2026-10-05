"use server";

import { supabase } from "./supabase/supabase";

export const getInstituitions = async (search?: string) => {
  try {
    let query = supabase
      .from("instituitions")
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch instituitions. try again" };
    }

    if (data.length === 0) {
      return { error: "no instituition found" };
    }

    return { instituitions: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
