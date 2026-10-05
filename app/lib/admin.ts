"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { supabase } from "./supabase/supabase";

export const Admin = async () => {
  const cookieStore = await cookies();
  const SECRET = process.env.JWT_SECRET as string;
  const token = cookieStore.get("token")?.value as string;

  let decoded;
  try {
    decoded = jwt.verify(token, SECRET) as JwtPayload;
  } catch (err) {
    console.error(err);
    redirect("/admin/login");
  }

  const { data: admin, error: adminError } = await supabase
    .from("nursing_admin")
    .select("username, email, role")
    .eq("id", decoded.id)
    .single();

  if (!admin || adminError) {
    redirect("/admin/login");
  }

  if (admin.role !== "admin") {
    redirect("/admin/login");
  }

  return admin;
};
