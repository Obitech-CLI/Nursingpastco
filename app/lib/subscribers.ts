"use server";

import { Admin } from "./admin";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

export const getSubscribers = async (email?: string) => {
  await Admin();
  try {
    const cached = await redis.get("subscribers");
    if (cached) {
      return { subscribers: cached };
    }
    let query = supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (email) {
      query = query.ilike("email", `%${email}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch subscribers. try again" };
    }

    if (data.length === 0) {
      return { error: "no subscriber found" };
    }

    await redis.set("subscribers", data);

    return { subscribers: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
