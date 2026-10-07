"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const resolveInstituitionsUpdate = async () => {
  const res = await redis.hgetall("iUpdated");
  const coursesUpdate = await redis.get("coursesUpdate");
  const pastQuestionsUpdate = await redis.get("pastQuestionsUpdate");
  try {
    if (!res?.updated) {
      return { err: "no update found", msg: "" };
    }
    if (!coursesUpdate) {
      const { data, error } = await supabase
        .from("courses")
        .select("instituition, level")
        .eq("instituition", res?.old)
        .maybeSingle();

      if (error) {
        return { err: "something went wrong. try again", msg: "" };
      }

      const { error: updateError } = await supabase
        .from("courses")
        .update({ instituition: res?.new })
        .eq("instituition", res?.old);

      if (updateError) {
        return { err: "something went wrong. try again", msg: "" };
      }

      await redis.del("allCourses");
      await redis.del(`courses:${data?.instituition}`);
      await redis.del(`courses:${data?.level}`);
      await redis.del(`courses:${data?.instituition}:${data?.level}`);

      await redis.set("coursesUpdate", true);
    }
    if (!pastQuestionsUpdate) {
      const { data, error } = await supabase
        .from("pastQuestions")
        .select("instituition, level, course")
        .eq("instituition", res?.old)
        .maybeSingle();

      if (error) {
        return { err: "something went wrong", msg: "" };
      }
      const { error: updateError } = await supabase
        .from("pastQuestions")
        .update({ instituition: res?.new })
        .eq("instituition", res?.old);

      if (updateError) {
        return { err: "something went wrong", msg: "" };
      }

      const key = `pastQuestions:${data?.instituition}:${data?.level}:${data?.course}`;
      await redis.del(key);

      await redis.set("pastQuestionsUpdate", true);
    }

    await redis.del("iUpdated");
    await redis.del("coursesUpdate");
    await redis.del("pastQuestionsUpdate");

    return {
      msg: "update resolved success",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const resolveInstituitionsDelete = async () => {
  const res = await redis.hgetall("iDeleted");
  const coursesDelete = await redis.get("coursesDelete");
  const pastQuestionsDelete = await redis.get("pastQuestionsDelete");

  try {
    if (!res?.deleted) {
      return { err: "no delete found", msg: "" };
    }
    if (!coursesDelete) {
      const { data, error } = await supabase
        .from("courses")
        .select("instituition, level")
        .eq("instituition", res?.instituition)
        .maybeSingle();

      if (error) {
        return { err: "something went wrong", msg: "" };
      }

      const { error: deleteError } = await supabase
        .from("courses")
        .delete()
        .eq("instituition", res?.instituition);

      if (deleteError) {
        return { err: "something went wrong", msg: "" };
      }

      await redis.del("allCourses");
      await redis.del(`courses:${data?.instituition}`);
      await redis.del(`courses:${data?.level}`);
      await redis.del(`courses:${data?.instituition}:${data?.level}`);

      await redis.set("coursesDelete", true);
    }
    if (!pastQuestionsDelete) {
      const { data, error } = await supabase
        .from("pastQuestions")
        .select("instituition, level, course")
        .eq("instituition", res?.instituition)
        .maybeSingle();

      if (error) {
        return { err: "something went wrong", msg: "" };
      }
      const { error: deleteError } = await supabase
        .from("pastQuestions")
        .delete()
        .eq("instituition", res?.instituition);

      if (deleteError) {
        return { err: "something went wrong", msg: "" };
      }

      const key = `pastQuestions:${data?.instituition}:${data?.level}:${data?.course}`;
      await redis.del(key);

      await redis.set("pastQuestionsDelete", true);
    }

    await redis.del("iDeleted");
    await redis.del("coursesDelete");
    await redis.del("pastQuestionsDelete");

    return {
      msg: "deletes resolved success",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
