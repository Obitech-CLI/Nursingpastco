"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const resolveCoursesUpdate = async () => {
  const res = await redis.hgetall("cUpdate");
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

    await redis.del("cUpdate");

    return {
      msg: "successfully resolved updates for course related past-questions",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const resolveCoursesDelete = async () => {
  const res = await redis.hgetall("cDelete");

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

    await redis.del("cDelete");

    return {
      msg: "successfully resolved deletes for related course past-questions",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
