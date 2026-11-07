"use server";

import { supabase1 } from "./supabase/supabase1";

export const getNMCCourses = async (country?: string) => {
  try {
    if (!country) {
      return { error: "choose a country" };
    }

    const { data, error } = await supabase1
      .from("nmc_courses")
      .select("id, course, country")
      .eq("country", country)
      .order("created_at", { ascending: true });

    if (error) {
      return { error: "something went wrong. try again" };
    }

    if (data.length === 0) {
      return { error: "no nmc course found" };
    }

    return { courses: data };
  } catch (err) {
    console.error(err);
    return {
      error:
        "something went wrong. please check your internet connection and try again.",
    };
  }
};

export const getNMCPastQuestions = async (
  country?: string,
  course?: string,
) => {
  try {
    if (!country) {
      return { error: "choose a country" };
    }

    if (!course) {
      return { error: "choose a course" };
    }

    const { data, error } = await supabase1
      .from("nmc_pastQuestions")
      .select("id, course, country, title, pdf")
      .eq("country", country)
      .eq("course", course)
      .order("created_at", { ascending: true });

    if (error) {
      return { error: "something went wrong. try again" };
    }

    if (data.length === 0) {
      return { error: "no nmc past question found" };
    }

    return { pastQuestions: data };
  } catch (err) {
    console.error(err);
    return {
      error:
        "something went wrong. please check your internet connection and try again.",
    };
  }
};
