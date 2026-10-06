"use server";

import { Admin } from "@/app/lib/admin";
import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";
import { revalidatePath } from "next/cache";

export const updateCourse = async (prevData: any, formData: FormData) => {
  const courseId = formData.get("course-id");
  const instituition = formData.get("instituition") as string;
  const course = formData.get("course") as string;
  const level = formData.get("level") as string;

  const updated = await redis.hget("cUpdated", "updated");

  await Admin();

  try {
    if (updated) {
      return { err: "resolve previous update to continue", msg: "" };
    }

    if (!instituition || !course || !level) {
      return { err: "empty input detected", msg: "" };
    }

    const { data, error } = await supabase
      .from("courses")
      .select("instituition, course, level")
      .eq("id", courseId)
      .maybeSingle();

    if (error) {
      return { err: "something went wrong, try again", msg: "" };
    }

    const { error: updateError } = await supabase
      .from("courses")
      .update({
        instituition: instituition,
        course: course,
        level: level,
      })
      .eq("id", courseId);

    if (updateError) {
      return { err: "failed to update course, try again", msg: "" };
    }

    await redis.hset("cUpdated", {
      updated: true,
      oldInstituition: data?.instituition,
      oldCourse: data?.course,
      oldLevel: data?.level,
      newInstituition: instituition,
      newCourse: course,
      newLevel: level,
    });

    await redis.del("allCourses");
    await redis.del(`courses:${data?.instituition}`);
    await redis.del(`courses:${data?.level}`);
    await redis.del(`courses:${data?.instituition}:${data?.level}`);

    return { msg: "course update success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const deleteCourse = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;

  const deleted = await redis.hget("cDeleted", "deleted");

  await Admin();

  try {
    if (deleted) {
      return { err: "resolve previous delete to continue", msg: "" };
    }

    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { data, error } = await supabase
      .from("courses")
      .select("instituition, course, level")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return { err: "something went wrong, try again", msg: "" };
    }

    const { error: deleteError } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return { err: "failed to delete course. try again", msg: "" };
    }

    await redis.hset("cDeleted", {
      deleted: true,
      instituition: data?.instituition,
      course: data?.course,
      level: data?.level,
    });

    await redis.del("allCourses");
    await redis.del(`courses:${data?.instituition}`);
    await redis.del(`courses:${data?.level}`);
    await redis.del(`courses:${data?.instituition}:${data?.level}`);

    return { msg: "course deleted success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
