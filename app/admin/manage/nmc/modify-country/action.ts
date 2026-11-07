"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const updateNMCCountry = async (prevData: any, formData: FormData) => {
  const id = formData.get("country") as string;
  const country = (formData.get("country") as string).trim().toLowerCase();
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }
    if (!country || !description) {
      return { err: "empty input detected", msg: "" };
    }

    if (!image || image.size === 0) {
      const { error } = await supabase0
        .from("nmc_countries")
        .update({
          country: country,
          description: description,
        })
        .eq("id", id);

      if (error) {
        return { err: "failed to update nmc country. try again", msg: "" };
      }

      return { msg: "nmc country update success", err: "" };
    }

    const { data: nmcImgUrl, error: nmcImgUrlError } = await supabase0
      .from("nmc")
      .select("image")
      .eq("id", id)
      .single();

    if (!nmcImgUrl || nmcImgUrlError) {
      return { err: "failed to fetch img file url", msg: "" };
    }

    const fileUrl = nmcImgUrl.image;
    const path = decodeURIComponent(fileUrl.split("/nmc_images/"))[1];

    const { error: storageDeleteError } = await supabase0.storage
      .from("nmc_images")
      .remove([path]);

    if (storageDeleteError) {
      return {
        err: "failed to remove previous nmc country image file from storage",
        msg: "",
      };
    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error: storageError } = await supabase0.storage
      .from("nmc_images")
      .upload(`NMC/${fileName}`, image, {
        contentType: image.type,
      });

    if (storageError) {
      return {
        err: "failed to save new country image file to storage. try again",
        msg: "",
      };
    }

    const { data: Url } = supabase0.storage
      .from("nmc_images")
      .getPublicUrl(`NMC/${fileName}`);

    const { error } = await supabase0
      .from("nmc_countries")
      .update({
        country: country,
        image: Url.publicUrl,
        description: description,
      })
      .eq("id", id);

    if (error) {
      return { err: "failed to update nmc country. try again", msg: "" };
    }

    return { msg: "nmc country update success", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};

export const deleteNMCCountry = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { error } = await supabase0
      .from("nmc_countries")
      .delete()
      .eq("id", id);

    if (error) {
      return { err: "failed to delete nmc country. try again", msg: "" };
    }

    return { msg: "nmc country delete success", err: "" };
  } catch (err) {
    console.error(err);
    return {
      err: "something went wrong. please check your internet connection and try again",
      msg: "",
    };
  }
};
