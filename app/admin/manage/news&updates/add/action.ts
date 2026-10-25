"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const addNews = async (prevData: any, formData: FormData) => {
  const category = formData.get("category") as string;
  const title = (formData.get("title") as string).trim().toLowerCase();
  const news = (formData.get("news") as string).trim().toLowerCase();
  const file = formData.get("image") as File;
  console.log(formData);
  try {
    if (!category || !title || !news) {
      return { err: "empty input field", msg: "" };
    }

    if (!file || file.size === 0) {
      return { error: "no image uploaded", msg: "" };
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("news_images")
      .upload(`News/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return { err: "storage failed to save image. try again", msg: "" };
    }

    const { data: imageUrl } = supabase0.storage
      .from("news_images")
      .getPublicUrl(`News/${category}/${fileName}`);

    const { error: insertError } = await supabase0.from("news").insert({
      category: category,
      title: title,
      news: news,
      image: imageUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to add news/update, try again", msg: "" };
    }

    console.log("here");

    return { msg: "news/update added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
