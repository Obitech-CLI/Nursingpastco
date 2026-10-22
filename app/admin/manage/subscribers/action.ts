"use server";

import { UnsubscribedEmailTemplate } from "@/app/components/Email-Template";
import { transporter } from "@/app/config/mailer";
import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";
import { Resend } from "resend";

export const UnSubscribeUser = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const confirm = formData.get("confirm") as string;

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to unsubscribe") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      return { err: "failed to unsubscribe user. try again", msg: "" };
    }

    await resend.emails.send({
      from: "NursingPastco <support@nursingpastco.com>",
      to: email,
      subject: "Unsubscribed To Newsletter",
      react: UnsubscribedEmailTemplate(),
    });

    await redis.del("subscribers");

    return { msg: "unsubscribed successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
