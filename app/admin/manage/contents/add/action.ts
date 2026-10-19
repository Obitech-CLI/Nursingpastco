"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const addContents = async (prevData: any, formData: FormData) => {
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File;
  try {
    if (!category || !title || !content) {
      return { err: "empty input field", msg: "" };
    }

    if (!file) {
      return { err: "no image or video uploaded", msg: "" };
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("contents_files")
      .upload(`Contents/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return { err: "storage failed to save file. try again", msg: "" };
    }

    const { data: fileUrl } = supabase0.storage
      .from("contents_files")
      .getPublicUrl(`Contents/${category}/${fileName}`);

    const { error: insertError } = await supabase0.from("contents").insert({
      category: category,
      title: title,
      content: content,
      file: fileUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to add content. try again", msg: "" };
    }

    return { msg: "content added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
