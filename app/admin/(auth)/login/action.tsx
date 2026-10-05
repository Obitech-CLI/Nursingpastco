"use server";

import { supabase } from "@/app/lib/supabase/supabase";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const LoginAdmin = async (prevData: any, formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();
  const SECRET = process.env.JWT_SECRET as string;

  try {
    if (!username || !password) {
      return { err: "empty input detected", msg: "" };
    }

    const { data: admin, error: adminError } = await supabase
      .from("nursing_admin")
      .select("*")
      .eq("username", username)
      .single();

    if (!admin || adminError) {
      return { err: "invalid credentials", msg: "" };
    }

    const matchPassword = await bcrypt.compare(password, admin.password);

    if (!matchPassword) {
      return { err: "invalid credentials", msg: "" };
    }

    const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: "1h" });

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });
    return { msg: "login success", err: "" };
  } catch (error) {
    console.error(error);
    return { err: "server error", msg: "" };
  }
};
