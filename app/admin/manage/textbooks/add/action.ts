"use server";

import { supabase2 } from "@/app/lib/supabase/supabase2";

export const addTextBook = async (prevData: any, formData: FormData) => {
  const pdf = formData.get("pdf") as File;
  const image = formData.get("image") as File;
  try {
    if (!pdf.size || !pdf) {
      return { err: "no file uploaded", msg: "" };
    }

    if (!image.size || !image) {
      return { err: "no cover image uploaded", msg: "" };
    }

    const pdfName = `${Date.now()}-${pdf.name}`;
    const imageName = `${Date.now()}-${image.name}`;

    const title = pdf.name.slice(0, -3);

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

    const { error: storageError } = await supabase2.storage
      .from("pdfs")
      .upload(`Textbooks/${pdfName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return {
        msg: "something went wrong but cover image was saved to storage. try again",
        ok: false,
      };
    }

    const { data: pdfUrl } = supabase2.storage
      .from("pdfs")
      .getPublicUrl(`Textbooks/${pdfName}`);

    const { error: insertError } = await supabase2.from("textbooks").insert({
      title: title,
      pdf: pdfUrl.publicUrl,
      cover: imageUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to upload textbook. try again", msg: "" };
    }

    return { msg: "textbook uplaoded successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
