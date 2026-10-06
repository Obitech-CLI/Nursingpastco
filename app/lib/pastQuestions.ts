"use server";

import { PastQuestionType } from "../types/types";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

export const getPastQuestions = async (
  instituition?: string,
  course?: string,
  level?: string,
) => {
  try {
    if (!instituition) {
      return { error: "choose an instituition to see past questions" };
    }
    if (!level) {
      return { error: "choose a level to see past questions" };
    }
    if (!course) {
      return { error: "choose a course to see past questions" };
    }

    const key = `pastQuestions:${instituition}:${level}:${course}`;
    const cached = await redis.get<PastQuestionType[]>(key);
    if (cached) {
      return { pastQuestions: cached };
    }

    let query = supabase
      .from("pastQuestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (instituition) {
      query = query.ilike("instituition", `%${instituition}%`);
    }

    if (course) {
      query = query.ilike("course", `%${course}%`);
    }

    if (level) {
      query = query.ilike("level", `%${level}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch pastQuestion. try again" };
    }

    if (data.length === 0) {
      return { error: "no pastQuestion found" };
    }

    await redis.set(key, data);

    return { pastQuestions: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
