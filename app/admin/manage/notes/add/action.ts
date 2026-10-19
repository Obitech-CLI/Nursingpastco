"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const addNote = async (prevData: any, formData: FormData) => {
  const pdf = formData.get("pdf") as File;
  try {
    if (!pdf.size || !pdf) {
      return { err: "no file uploaded", msg: "" };
    }
    const pdfName = `${Date.now()}-${pdf.name}`;

    const title = pdf.name.slice(0, -3);

    const { error: storageError } = await supabase1.storage
      .from("pdfs")
      .upload(`Note/${pdfName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return { msg: "something went wrong. try again", ok: false };
    }

    const { data: pdfUrl } = supabase1.storage
      .from("pdfs")
      .getPublicUrl(`Note/${pdfName}`);

    const { error: insertError } = await supabase1.from("notes").insert({
      title: title,
      pdf: pdfUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to add nmcn. try again", msg: "" };
    }
    return { msg: "note uplaoded successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
