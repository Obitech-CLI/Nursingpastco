"use server";

import { supabase } from "@/app/lib/supabase/supabase";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getIP } from "@/app/lib/ip";
import { redis } from "@/app/lib/redis";

export const LoginAdmin = async (prevData: any, formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();
  const SECRET = process.env.JWT_SECRET as string;

  const ip = await getIP();

  try {
    if (!ip) {
      return { err: "unable to identify ip address", msg: "" };
    }

    const key = `login:${ip}`;
    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, 180);
    }

    if (attempts > 5) {
      return { err: "too many login attempts. try again later", msg: "" };
    }
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
