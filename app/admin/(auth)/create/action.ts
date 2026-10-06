"use server";

import { supabase } from "@/app/lib/supabase/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const CreateAdmin = async (prevData: any, formData: FormData) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();
  const SECRET = process.env.JWT_SECRET as string;

  try {
    if (!username || !email || !password) {
      return { error: "empty input detected" };
    }

    const { data, error } = await supabase
      .from("nursing_admin")
      .select("username, email")
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle();

    if (error) {
      return { err: "something went wrong", msg: "" };
    }

    if (data) {
      return { err: "invalid credentials", msg: "" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: admin, error: insertError } = await supabase
      .from("nursing_admin")
      .insert({
        username: username,
        email: email,
        password: hashedPassword,
      })
      .select("id")
      .single();

    if (insertError) {
      return { err: "failed to create account. try again", msg: "" };
    }

    const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: "1h" });

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });
    return { msg: "account created success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
