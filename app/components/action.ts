"use server";

import { transporter } from "../config/mailer";
import { getIP } from "../lib/ip";
import { redis } from "../lib/redis";
import { supabase } from "../lib/supabase/supabase";

export const Subscribe = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const ip = await getIP();
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscribed Successfully",
      html: `<div
      style="
        padding: 1rem;
      "
    >
        <h3>Thank you for subscribing to our newsletter.<br> We're glad to have you with
        us.</h3>
      
        From time to time, we'll send you useful notifications updates, <br>and
        other content we think you'll find valuable.<br><br>
      
        We appreciate you being here and look forward to staying connected.<br><br>

        Best regards, The Nursingpastco Team
        <p>© ${new Date().getFullYear()} nursingpastco. All rights reserved.</p>
  
    </div>`,
    });

    await redis.del("subscribers");

    return { msg: "subscribed successfully", ok: true };
  } catch (err) {
    console.error(err);
    return { msg: "server error", ok: false };
  }
};
