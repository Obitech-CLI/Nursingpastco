"use server";

import { Admin } from "@/app/lib/admin";
import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const updatePastQuestion = async (prevData: any, formData: FormData) => {
  const Id = formData.get("pastQuestion-id");
  const instituition = formData.get("instituition") as string;
  const course = formData.get("course") as string;
  const level = formData.get("level") as string;
  const pdf = formData.get("pdf") as File;

  const title = pdf.name.slice(0, -3);

  await Admin();
  try {
    if (!instituition || !course || !level) {
      return { err: "empty input detected", msg: "" };
    }

    if (pdf.size) {
      const { data: pdfUrl, error: pdfUrlError } = await supabase
        .from("pastQuestions")
        .select("pdf")
        .eq("id", Id)
        .single();

      if (pdfUrlError) {
        return { err: "something went wrong, try again", msg: "" };
      }

      const path = decodeURIComponent(pdfUrl.pdf.split("/pdfs/")[1]);

      const { error: storageDeleteError } = await supabase.storage
        .from("pdfs")
        .remove([path]);

      if (storageDeleteError) {
        return {
          err: "storage failed to remove previous pdf. try again",
          msg: "",
        };
      }

      const fileName = `${Date.now()}-${pdf.name}`;

      const { error: storageError } = await supabase.storage
        .from("pdfs")
        .upload(`${instituition}/${level}/${course}/${fileName}`, pdf, {
          contentType: pdf.type,
        });

      if (storageError) {
        return { err: "something went wrong, try again", msg: "" };
      }

      const { data: newPdfUrl } = supabase.storage
        .from("pdfs")
        .getPublicUrl(`${instituition}/${level}/${course}/${fileName}`);

      const { error: updateError } = await supabase
        .from("pastQuestions")
        .update({
          instituition: instituition,
          course: course,
          level: level,
          title: title,
          pdf: newPdfUrl.publicUrl,
        })
        .eq("id", Id);

      if (updateError) {
        return { err: "failed to update pastQuestion, try again", msg: "" };
      }

      const key = `pastQuestions:${instituition}:${level}:${course}`;
      await redis.del(key);

      return { msg: "pastQuestions update success", err: "" };
    }

    const { error: updateError } = await supabase
      .from("pastQuestions")
      .update({
        instituition: instituition,
        course: course,
        level: level,
      })
      .eq("id", Id);

    if (updateError) {
      return { err: "failed to update pastQuestion, try again", msg: "" };
    }

    const key = `pastQuestions:${instituition}:${level}:${course}`;
    await redis.del(key);

    return { msg: "pastQuestions update success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const deletePastQuestion = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { data, error } = await supabase
      .from("pastQuestions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { err: "something went wrong, try again", msg: "" };
    }

    const { data: pdfUrl, error: pdfUrlError } = await supabase
      .from("pastQuestions")
      .select("pdf")
      .eq("id", id)
      .single();

    if (pdfUrlError) {
      return { err: "something went wrong, try again", msg: "" };
    }

    const path = decodeURIComponent(pdfUrl.pdf.split("/pdfs/")[1]);

    const { error: deleteError } = await supabase
      .from("pastQuestions")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return { err: "failed to delete pastQuestions. try again", msg: "" };
    }

    const { error: storageDeleteError } = await supabase.storage
      .from("pdfs")
      .remove([path]);

    if (storageDeleteError) {
      return {
        msg: "past question deleted success but storage clean up failed",
        err: "",
      };
    }

    const key = `pastQuestions:${data?.instituition}:${data?.level}:${data?.course}`;
    await redis.del(key);

    return { msg: "pastQuestions deleted success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
