"use server";

import { getIP } from "../lib/ip";
import { redis } from "../lib/redis";
import { supabase } from "../lib/supabase/supabase";

export const SendMessage = async (prevData: any, formData: FormData) => {
  const fullname = formData.get("fullname") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const ip = await getIP();
  try {
    if (!ip) {
      return { err: "unable to identify ip address", msg: "" };
    }

    if (!fullname || !email || !message) {
      return { err: "empty input detected", msg: "" };
    }

    const { error } = await supabase.from("messages").insert({
      fullname: fullname,
      email: email,
      message: message,
    });

    if (error) {
      return { err: "something went wrong. try again", msg: "" };
    }

    await redis.del("contact-messages");

    const key = `user:${ip}`;
    const sent = await redis.incr(key);

    if (sent === 1) {
      await redis.expire(key, 1800);
    }

    if (sent > 2) {
      return { err: "message limit exhausted. try again later", msg: "" };
    }

    return { msg: "message sent successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
