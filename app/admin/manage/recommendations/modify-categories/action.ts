"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const updateRecommendationsCategory = async (
  prevData: any,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  const category = (formData.get("category") as string).trim().toLowerCase();
  try {
    //prevent database from running on an empty input
    if (!category) {
      return { err: "empty input detected", msg: "" };
    }

    const { error } = await supabase0
      .from("recommendations_categories")
      .update({ category: category })
      .eq("id", id);

    if (error) {
      return { err: "failed to update category. try again", msg: "" };
    }

    return { msg: "category update success", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};

export const deleteRecommendationsCategory = async (
  prevData: any,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase0
      .from("recommendations_categories")
      .delete()
      .eq("id", id);

    if (error) {
      return { err: "failed to delete category. try again", msg: "" };
    }

    return { msg: "category delete success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
