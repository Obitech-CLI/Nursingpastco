"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const AddNMCPastQuestions = async (
  prevData: any,
  formData: FormData,
) => {
  const course = (formData.get("course") as string).trim().toLowerCase();
  const country = (formData.get("country") as string).trim().toLowerCase();
  const pdf = formData.get("pdf") as File;
  try {
    if (!country || !course) {
      return { err: "empty input detected", msg: "" };
    }

    if (!pdf || pdf.size === 0) {
      return { err: "no pdf file uploaded", msg: "" };
    }

    const fileName = `${Date.now()}-${pdf.name}`;
    const title = pdf.name.slice(0, -3);

    const { error: storageError } = await supabase1.storage
      .from("nmc_pdfs")
      .upload(`PDFs/${fileName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    const { data: pdfUrl } = supabase1.storage
      .from("nmc_pdfs")
      .getPublicUrl(`PDFs/${fileName}`);

    const { error: insertError } = await supabase1
      .from("nmc_pastQuestions")
      .insert({
        country: country,
        course: course,
        title: title,
        pdf: pdfUrl.publicUrl,
      });

    if (insertError) {
      return { err: "failed to add nmc past questions. try again", msg: "" };
    }

    return { msg: "nmc past questions added successfully", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};
