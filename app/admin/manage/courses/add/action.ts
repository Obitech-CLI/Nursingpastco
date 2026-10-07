"use server";

import { Admin } from "@/app/lib/admin";
import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const addCourse = async (prevData: any, formData: FormData) => {
  const instituition = (formData.get("instituition") as string)
    .trim()
    .toLowerCase();
  const course = (formData.get("course") as string).trim().toLowerCase();
  const level = (formData.get("level") as string).trim().toLowerCase();

  await Admin();

  try {
    if (!instituition || !course || !level) {
      return { err: "empty input detected", msg: "" };
    }

    const { data: existingData, error: existingDataError } = await supabase
      .from("courses")
      .select("course")
      .eq("course", course)
      .eq("instituition", instituition)
      .eq("level", level)
      .maybeSingle();

    if (existingDataError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    if (existingData) {
      return {
        err: "course already exists for this instituition and level",
        msg: "",
      };
    }

    const { error: insertError } = await supabase.from("courses").insert({
      instituition: instituition,
      course: course,
      level: level,
    });

    if (insertError) {
      return { err: "failed to add course, try again", msg: "" };
    }

    await redis.del("allCourses");
    await redis.del(`courses:${instituition}`);
    await redis.del(`courses:${level}`);
    await redis.del(`courses:${instituition}:${level}`);

    return { msg: "course added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
