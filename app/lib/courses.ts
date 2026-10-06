"use server";

import { CourseType } from "../types/types";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

export const getCourses = async (instituition?: string, level?: string) => {
  const cachedAll = await redis.get<CourseType[]>("allCourses");
  const cachedI = await redis.get<CourseType[]>(`courses:${instituition}`);
  const cachedL = await redis.get<CourseType[]>(`courses:${level}`);
  const cachedBoth = await redis.get<CourseType[]>(
    `courses:${instituition}:${level}`,
  );

  if (!instituition && !level) {
    if (cachedAll) {
      return { courses: cachedAll };
    }
  }
  if (instituition && !level) {
    if (cachedI) {
      return { courses: cachedI };
    }
  }

  if (level && !instituition) {
    if (cachedL) {
      return { courses: cachedL };
    }
  }

  if (instituition && level) {
    return { courses: cachedBoth };
  }
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

    if (!instituition && !level) {
      await redis.set("allCourses", data);
    }
    if (instituition && !level) {
      await redis.set(`courses:${instituition}`, data);
    }

    if (level && !instituition) {
      await redis.set(`courses:${level}`, data);
    }

    if (instituition && level) {
      await redis.set(`courses:${instituition}:${level}`, data);
    }

    return { courses: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
