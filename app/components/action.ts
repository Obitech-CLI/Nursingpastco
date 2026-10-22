"use server";

import { Resend } from "resend";
import { getIP } from "../lib/ip";
import { redis } from "../lib/redis";
import { supabase } from "../lib/supabase/supabase";
import { SubscribedEmailTemplate } from "./Email-Template";

export const Subscribe = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const ip = await getIP();
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    if (!ip) {
      return { err: "unable to identify ip address", msg: "" };
    }

    const key = `subscriber:${ip}`;
    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, 180);
    }

    if (attempts > 5) {
      return { err: "too many subscribe attempts. try again later", msg: "" };
    }
    if (!email) {
      return { msg: "empty input detected", ok: false };
    }

    const { data: subscribed, error: subscribedError } = await supabase
      .from("subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (subscribedError) {
      return { msg: "something went wrong", ok: false };
    }

    if (subscribed) {
      return { msg: "email already subscribed", ok: false };
    }

    const { error } = await supabase.from("subscribers").insert({
      email: email,
    });

    if (error) {
      return { msg: "something went wrong", ok: false };
    }

    await resend.emails.send({
      from: "NursingPastco <support@nursingpastco.com>",
      to: email,
      subject: "Subscribed Successfully",
      react: SubscribedEmailTemplate(),
    });

    await redis.del("subscribers");

    return { msg: "subscribed successfully", ok: true };
  } catch (err) {
    console.error(err);
    return { msg: "server error", ok: false };
  }
};
