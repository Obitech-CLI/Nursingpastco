"use server";

import { InstitutionType } from "../types/types";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

export const getInstituitions = async () => {
  try {
    const cached = await redis.get<InstitutionType[]>("instituitions");
    if (cached) {
      return { instituitions: cached };
    }
    let query = supabase
      .from("instituitions")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch instituitions. try again" };
    }

    if (data.length === 0) {
      return { error: "no instituition found" };
    }

    await redis.set("instituitions", data);

    return { instituitions: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
