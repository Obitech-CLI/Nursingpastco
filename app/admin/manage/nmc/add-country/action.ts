"use server";

import { supabase1 } from "@/app/lib/supabase/supabase1";

export const AddNMCCountry = async (prevData: any, formData: FormData) => {
  const country = (formData.get("country") as string).trim().toLowerCase();
  const description = (formData.get("description") as string)
    .trim()
    .toLowerCase();
  const image = formData.get("image") as File;
  try {
    if (!country || !description) {
      return { err: "empty input detected", msg: "" };
    }
    if (!image || image.size === 0) {
      return { err: "no image uploaded", msg: "" };
    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error: storageError } = await supabase1.storage
      .from("nmc_images")
      .upload(`NMC/${fileName}`, image, {
        contentType: image.type,
      });

    if (storageError) {
      return { err: "something went wrong. try again", msg: "" };
    }

    const { data: imgUrl } = supabase1.storage
      .from("nmc_images")
      .getPublicUrl(`NMC/${fileName}`);

    const { error: insertError } = await supabase1
      .from("nmc_countries")
      .insert({
        country: country,
        description: description,
        image: imgUrl.publicUrl,
      });

    if (insertError) {
      return { err: "failed to add nmc country. try again", msg: "" };
    }

    return { msg: "nmc country added successfully", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};
