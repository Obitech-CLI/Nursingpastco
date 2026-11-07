"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const updateNMCCourse = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const course = (formData.get("course") as string).trim().toLowerCase();
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (!course) {
      return { err: "empty course input", msg: "" };
    }

    const { error } = await supabase1
      .from("nmc_courses")
      .update({
        course: course,
      })
      .eq("id", id);

    if (error) {
      return { err: "failed to update nmc course. try again", msg: "" };
    }

    return { msg: "nmc course updated successfully", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connectuion and try again ",
      msg: "",
    };
  }
};

export const deleteNMCCourse = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase1.from("nmc_courses").delete().eq("id", id);

    if (error) {
      return { err: "failed to delete nmc course. try again", msg: "" };
    }

    return { msg: "nmc course deleted successfully", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connectuion and try again ",
      msg: "",
    };
  }
};
