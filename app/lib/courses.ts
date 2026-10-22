"use server";

import { CourseType } from "../types/types";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

type Type = {
  courses?: CourseType[];
  error?: string;
};

export const getCourses = async (
  instituition?: string,
  level?: string,
): Promise<Type> => {
  try {
    let query = supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (instituition) {
      query = query.ilike("instituition", `%${instituition}%`);
    }

    if (level) {
      query = query.ilike("level", `%${level}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch courses. try again" };
    }

    if (data.length === 0) {
      return { error: "no course found" };
    }

    return { courses: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
