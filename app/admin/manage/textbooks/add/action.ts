"use server";

import { supabase2 } from "@/app/lib/supabase/supabase2";

export const addTextBook = async (prevData: any, formData: FormData) => {
  const url = formData.get("url") as string;
  const image = formData.get("cover") as File;
  try {
    if (!image.size || !image) {
      return { err: "no cover image uploaded", msg: "" };
    }

    const imageName = `${Date.now()}-${image.name}`;

    const title = image.name.slice(0, -3);

    const { error: storageImageError } = await supabase2.storage
      .from("covers")
      .upload(`Covers/${imageName}`, image, {
        contentType: image.type,
      });

    if (storageImageError) {
      return { msg: "something went wrong. try again", ok: false };
    }

    const { data: imageUrl } = supabase2.storage
      .from("covers")
      .getPublicUrl(`Covers/${imageName}`);

    const { error: insertError } = await supabase2.from("textbooks").insert({
      title: title,
      pdf: url,
      cover: imageUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to upload textbook. try again", msg: "" };
    }

    return { msg: "textbook uploaded successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
