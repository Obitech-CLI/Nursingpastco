"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const UpdateRecommendations = async (
  prevData: any,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  const category = (formData.get("category") as string).trim().toLowerCase();
  const title = (formData.get("title") as string).trim().toLowerCase();
  const recommendation = (formData.get("recommendation") as string)
    .trim()
    .toLowerCase();
  const link = (formData.get("link") as string).trim().toLowerCase();
  const file = formData.get("image") as File;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (!title || !recommendation || !link) {
      return { err: "empty input field", msg: "" };
    }

    if (!file || file.size === 0) {
      const { error: updateError } = await supabase0
        .from("recommendations")
        .update({
          title: title,
          recommendation: recommendation,
          link: link,
        })
        .eq("id", id);

      if (updateError) {
        return { err: "failed to update recommendation. try again", msg: "" };
      }

      return { msg: "recommendation updated successfully", err: "" };
    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: recommendationUrl, error: recommendationUrlError } =
      await supabase0
        .from("recommendations")
        .select("file")
        .eq("id", id)
        .single();

    if (!recommendationUrl || recommendationUrlError) {
      return { err: "failed to fetch recommendation file url", msg: "" };
    }

    //get the file path
    const fileUrl = recommendationUrl.file;
    const path = decodeURIComponent(
      fileUrl.split("/recommendations_images"),
    )[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase0.storage
      .from("recommendation_images")
      .remove([path]);

    if (storageDeleteError) {
      return {
        err: "failed to remove previous recommendation file from storage",
        msg: "",
      };
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("recommendation_images")
      .upload(`Recommendations/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return {
        err: "failed to save new recommendation file to storage. try again",
        msg: "",
      };
    }

    const { data: Url } = supabase0.storage
      .from("recommendations_images")
      .getPublicUrl(`Recommendations/${category}/${fileName}`);

    const { error: updateError } = await supabase0
      .from("recommendations")
      .update({
        title: title,
        recommendation: recommendation,
        image: Url.publicUrl,
      })
      .eq("id", id);

    if (updateError) {
      return {
        err: "failed to update recommendation. try again",
        msg: "",
      };
    }

    return {
      msg: "recommendation updated successfully",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
