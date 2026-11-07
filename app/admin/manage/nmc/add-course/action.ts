"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const AddNMCCourse = async (prevData: any, formData: FormData) => {
  const course = (formData.get("course") as string).trim().toLowerCase();
  const country = (formData.get("country") as string).trim().toLowerCase();
  try {
    if (!country || !course) {
      return { err: "empty input detected", msg: "" };
    }

    const { error: insertError } = await supabase1.from("nmc_courses").insert({
      country: country,
      course: course,
    });

    if (insertError) {
      return { err: "failed to add nmc course. try again", msg: "" };
    }

    return { msg: "nmc course added successfully", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};
