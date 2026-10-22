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
    const cachedBoth = await redis.get<CourseType[]>(
      `courses:${instituition}:${level}`,
    );
    const cachedLevel = await redis.get<CourseType[]>(`courses:${level}`);
    const cachedInstituition = await redis.get<CourseType[]>(
      `courses:${instituition}`,
    );

    const cachedAll = await redis.get<CourseType[]>("allCourses");

    if (cachedBoth) {
      return { courses: cachedBoth };
    }

    if (cachedLevel) {
      return { courses: cachedLevel };
    }

    if (cachedInstituition) {
      return { courses: cachedInstituition };
    }

    if (cachedAll) {
      return { courses: cachedAll };
    }
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

    if (instituition && level) {
      await redis.set(`courses:${instituition}:${level}`, data);
    }
    if (level && !instituition) {
      await redis.set(`courses:${level}`, data);
    }
    if (instituition && !level) {
      await redis.set(`courses:${instituition}`, data);
    }
    if (!instituition && !level) {
      await redis.set("allCourses", data);
    }

    return { courses: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
