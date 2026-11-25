"use server";

import { supabase } from "@/app/lib/supabase/supabase";

export const addMidwiferyPastQuestion = async (
  prevData: any,
  formData: FormData,
) => {
  const instituition = (formData.get("instituition") as string)
    .trim()
    .toLowerCase();
  const course = (formData.get("course") as string).trim().toLowerCase();
  const pdf = formData.get("pdf") as File;

  const title = pdf.name.slice(0, -3).trim().toLowerCase();

  try {
    if (!instituition || !course) {
      return { err: "empty inputs detected", msg: "" };
    }

    if (pdf.size === 0 || !pdf) {
      return { err: "no pastQuestion pdf uploaded", msg: "" };
    }

    const { data: existingPastQuestion, error: existingPastQuestionError } =
      await supabase
        .from("midwifery_pastQuestions")
        .select("*")
        .eq("course", course)
        .eq("instituition", instituition)
        .eq("title", title)
        .maybeSingle();

    if (existingPastQuestionError) {
      return {
        err: "something went wrong. check your internet connection and try again",
        msg: "",
      };
    }

    if (existingPastQuestion) {
      return { err: "pastQuestion already exists. try another one", msg: "" };
    }

    const fileName = `${Date.now()}-${pdf.name}`;

    const { error: storageError } = await supabase.storage
      .from("pdfs")
      .upload(`Midwifery/${instituition}/${course}/${fileName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    const { data: pdfUrl } = supabase.storage
      .from("pdfs")
      .getPublicUrl(`Midwifery/${instituition}/${course}/${fileName}`);

    const { error: insertError } = await supabase
      .from("midwifery_pastQuestions")
      .insert({
        instituition: instituition,
        course: course,
        title: title,
        pdf: pdfUrl.publicUrl,
      });

    if (insertError) {
      return { err: "failed to add midwifery course. try again", msg: "" };
    }

    return { msg: "midwifery course added successfully", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
