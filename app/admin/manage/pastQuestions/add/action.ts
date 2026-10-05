"use server";

import { supabase } from "@/app/lib/supabase/supabase";

export const addPastQuestion = async (prevData: any, formData: FormData) => {
  const instituition = formData.get("instituition") as string;
  const level = formData.get("level") as string;
  const course = formData.get("course") as string;
  const pdf = formData.get("pdf") as File;
  try {
    if (!instituition || !level || !course) {
      return { err: "empty input detected", msg: "" };
    }

    if (!pdf) {
      return { err: "upload a pdf file", msg: "" };
    }

    const { data: existingData, error: existingDataError } = await supabase
      .from("pastQuestions")
      .select("title")
      .eq("instituition", instituition)
      .eq("level", level)
      .eq("course", course)
      .eq("title", pdf.name)
      .maybeSingle();

    if (existingDataError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    if (existingData) {
      return { err: "pastQuestion already exists", msg: "" };
    }

    const fileName = `${Date.now()}-${pdf.name}`;

    const { error: storageError } = await supabase.storage
      .from("pdfs")
      .upload(`${instituition}/${level}/${course}/${fileName}`, pdf, {
        contentType: pdf.type,
      });

    if (storageError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    const { data: pdfUrl } = supabase.storage
      .from("pdfs")
      .getPublicUrl(`${instituition}/${level}/${course}/${fileName}`);

    const { error: insertError } = await supabase.from("pastQuestions").insert({
      instituition: instituition,
      course: course,
      level: level,
      title: pdf.name,
      pdf: pdfUrl.publicUrl,
    });

    if (insertError) {
      return { err: "failed to add pastQuestion, try again", msg: "" };
    }

    return { msg: "pastQuestion added success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
