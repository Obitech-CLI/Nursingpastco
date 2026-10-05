"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const resolveInstituitionsUpdate = async () => {
  const res = await redis.hgetall("iUpdate");
  const coursesUpdate = await redis.get("coursesUpdate");
  const pastQuestionsUpdate = await redis.get("pastQuestionsUpdate");
  try {
    if (!res?.updated) {
      return { err: "no update found", msg: "" };
    }
    if (!coursesUpdate) {
      const { error } = await supabase
        .from("courses")
        .update({ instituition: res?.new })
        .eq("instituition", res?.old);

      if (error) {
        return { err: "something went wrong", msg: "" };
      }

      await redis.set("coursesUpdate", true);
    }
    if (!pastQuestionsUpdate) {
      const { error } = await supabase
        .from("pastQuestions")
        .update({ instituition: res?.new })
        .eq("instituition", res?.old);

      if (error) {
        return { err: "something went wrong", msg: "" };
      }

      await redis.set("pastQuestionsUpdate", true);
    }

    await redis.del("iUpdate");

    return {
      msg: "resolved updates for related instituition courses and past-questions success",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const resolveInstituitionsDelete = async () => {
  const res = await redis.hgetall("iDelete");
  const coursesDelete = await redis.get("coursesDelete");
  const pastQuestionsDelete = await redis.get("pastQuestionsDelete");
  try {
    if (!res?.deleted) {
      return { err: "no delete found", msg: "" };
    }
    if (!coursesDelete) {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("instituition", res?.instituition);

      if (error) {
        return { err: "something went wrong", msg: "" };
      }

      await redis.set("coursesDelete", true);
    }
    if (!pastQuestionsDelete) {
      const { error } = await supabase
        .from("pastQuestions")
        .delete()
        .eq("instituition", res?.instituition);

      if (error) {
        return { err: "something went wrong", msg: "" };
      }

      await redis.set("pastQuestionsDelete", true);
    }

    await redis.del("iDelete");

    return {
      msg: "resolved deletes for related instituition courses and past-questions success",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
