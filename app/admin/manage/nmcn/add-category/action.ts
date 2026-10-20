"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const AddNMCNCategories = async (prevData: any, formData: FormData) => {
  const category = formData.get("category") as string;
  try {
    //prevent database from running on an empty input
    if (!category) {
      return { err: "empty input detected", msg: "" };
    }

    //check if the submitted category already exists
    const { data: existingCategory, error: existingCategoryError } =
      await supabase1
        .from("nmcn_categories")
        .select("category")
        .eq("category", category)
        .maybeSingle();

    if (existingCategoryError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    //prevent duplicate category
    if (existingCategory) {
      return { err: "category already exists", msg: "" };
    }

    //create a  new category
    const { error } = await supabase1.from("nmcn_categories").insert({
      category: category,
    });

    if (error) {
      return { err: "something went wrong. try again", msg: "" };
    }

    return { msg: "category added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
