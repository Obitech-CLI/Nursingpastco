"use server";

import { redis } from "@/app/lib/redis";
import { supabase1 } from "@/app/lib/supabase/supabase1";

export const addNMCN = async (prevData: any, formData: FormData) => {
  const pdf = formData.get("pdf") as File;
  const category = formData.get("category") as string;
  try {
    if (!category) {
      return { err: "no category selected", msg: "" };
    }
    if (!pdf.size || !pdf) {
      return { err: "no file uploaded", msg: "" };
    }

    const pdfName = `${Date.now()}-${pdf.name}`;

    const title = pdf.name.slice(0, -3);

    const { error: storageError } = await supabase1.storage
      .from("pdfs")
      .upload(`NMCN/${pdfName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return { msg: "something went wrong. try again", ok: false };
    }

    const { data: pdfUrl } = supabase1.storage
      .from("pdfs")
      .getPublicUrl(`NMCN/${pdfName}`);

    const { error: insertError } = await supabase1.from("nmcn").insert({
      category: category,
      title: title,
      pdf: pdfUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to upload nmcn. try again", msg: "" };
    }
    await redis.del(`nmcnQuestions:${category}`);
    return { msg: "nmcn uplaoded successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
