"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const resolveCoursesUpdate = async () => {
  const res = await redis.hgetall("cUpdated");
  try {
    if (!res?.updated) {
      return { err: "no update found", msg: "" };
    }

    const { error } = await supabase
      .from("pastQuestions")
      .update({
        instituition: res?.newInstituition,
        course: res?.newCourse,
        level: res?.newLevel,
      })
      .eq("instituition", res?.oldInstituition)
      .eq("course", res?.oldCourse)
      .eq("level", res?.oldLevel);

    if (error) {
      return { err: "something went wrong", msg: "" };
    }

    await redis.del("cUpdated");

    return {
      msg: "successfully resolved updates",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const resolveCoursesDelete = async () => {
  const res = await redis.hgetall("cDeleted");

  try {
    if (!res?.deleted) {
      return { err: "no delete found", msg: "" };
    }

    const { error } = await supabase
      .from("pastQuestions")
      .delete()
      .eq("instituition", res?.instituition)
      .eq("course", res?.course)
      .eq("level", res?.level);

    if (error) {
      return { err: "something went wrong", msg: "" };
    }

    await redis.del("cDeleted");

    return {
      msg: "successfully resolved deletes",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
