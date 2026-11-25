"use server";

import { supabase } from "./supabase/supabase";

export const getMidwiferyCourses = async (instituition?: string) => {
  try {
    if (!instituition) {
      return {
        error: "choose an instituition to see midwifery courses",
      };
    }

    let query = supabase
      .from("midwifery_courses")
      .select("*")
      .eq("instituition", instituition)
      .order("created_at", { ascending: true });

    const { data, error } = await query;

    if (error) {
      return {
        error:
          "something went wrong. check your internet connection and try again",
      };
    }

    if (data.length === 0) {
      return { error: "no midwifery courses found" };
    }

    return { courses: data };
  } catch (err) {
    console.error(err);
    return {
      error: "server error",
    };
  }
};

export const getMidwiferyPastQuestions = async (
  instituition?: string,
  course?: string,
) => {
  try {
    if (!instituition) {
      return {
        error: "choose an instituition to see midwifery courses",
      };
    }

    if (!course) {
      return {
        error: "choose a course to see midwifery past questions",
      };
    }

    let query = supabase
      .from("midwifery_pastQuestions")
      .select("*")
      .eq("instituition", instituition)
      .eq("course", course)
      .order("created_at", { ascending: true });

    const { data, error } = await query;

    if (error) {
      return {
        error:
          "something went wrong. check your internet connection and try again",
      };
    }

    if (data.length === 0) {
      return { error: "no midwifery past question found" };
    }

    return { pastQuestions: data };
  } catch (err) {
    console.error(err);
    return {
      error: "server error",
    };
  }
};
