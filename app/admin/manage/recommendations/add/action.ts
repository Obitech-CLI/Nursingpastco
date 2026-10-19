"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const addRecommendations = async (prevData: any, formData: FormData) => {
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const recommendation = formData.get("recommendation") as string;
  const link = formData.get("link") as string;
  const file = formData.get("image") as File;
  try {
    if (!category || !title || !recommendation || !link) {
      return { err: "empty input field", msg: "" };
    }

    if (!file) {
      return { err: "no image uploaded", msg: "" };
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("recommendations_images")
      .upload(`Recommendations/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return { err: "storage failed to save image. try again", msg: "" };
    }

    const { data: imageUrl } = supabase0.storage
      .from("recommendations_images")
      .getPublicUrl(`Recommendations/${category}/${fileName}`);

    const { error: insertError } = await supabase0
      .from("recommendations")
      .insert({
        category: category,
        title: title,
        recommendation: recommendation,
        link: link,
        image: imageUrl.publicUrl,
      });

    if (insertError) {
      return { err: "failed to add recommendation. try again", msg: "" };
    }

    return { msg: "recommendation added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
