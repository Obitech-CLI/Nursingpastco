"use server";

import { transporter } from "@/app/config/mailer";
import { supabase } from "@/app/lib/supabase/supabase";

export const UnSubscribeUser = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm !== "i want to unsubscribe") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      return { err: "failed to unsubscribe user. try again", msg: "" };
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "UnSubscribed Successfully",
      html: `<div
      style="
        padding: 1rem;
      "
    >
        <h3>You have been unsubscribed to our newsletter successfully</h3><br>
      
        From now on, you will no longer recieve email notifications from us.<br><br>
      
        if you want to subscribe again in the future, you can do so at any time.

        Best regards, The Nursingpastco Team
        <p>© ${new Date().getFullYear()} nursingpastco. All rights reserved.</p>
  
    </div>`,
    });

    return { msg: "unsubscribed successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
