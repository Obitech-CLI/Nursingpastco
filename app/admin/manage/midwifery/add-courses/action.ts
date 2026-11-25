"use server";

import { supabase } from "@/app/lib/supabase/supabase";

export const addMidwiferyCourse = async (prevData: any, formData: FormData) => {
  const instituition = (formData.get("instituition") as string)
    .trim()
    .toLowerCase();
  const course = (formData.get("course") as string).trim().toLowerCase();
  try {
    if (!instituition || !course) {
      return { err: "empty inputs detected", msg: "" };
    }

    const { data: existingCourse, error: existingCourseError } = await supabase
      .from("midwifery_courses")
      .select("course")
      .eq("course", course)
      .eq("instituition", instituition)
      .maybeSingle();

    if (existingCourseError) {
      return {
        err: "something went wrong. check your internet connection and try again",
        msg: "",
      };
    }

    if (existingCourse) {
      return { err: "course already exists. try another one", msg: "" };
    }

    const { error: insertError } = await supabase
      .from("midwifery_courses")
      .insert({
        instituition: instituition,
        course: course,
      });

    if (insertError) {
      return { err: "failed to add midwifery course. try again", msg: "" };
    }

    return { msg: "midwifery course added successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
