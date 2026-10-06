"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const addInstituition = async (prevData: any, formData: FormData) => {
  const instituitionName = formData.get("instituition-name") as string;
  const instituitionAbbr = formData.get("instituition-abbr") as string;
  const instituitionAbout = formData.get("about-instituition") as string;
  const instituitionLogo = formData.get("instituition-logo") as File;
  try {
    if (!instituitionName || !instituitionAbbr || !instituitionAbout) {
      return { msg: "empty input detected", ok: false };
    }

    if (!instituitionLogo) {
      return { msg: "upload a logo file", ok: false };
    }

    const { data: existingData, error: existingDataError } = await supabase
      .from("instituitions")
      .select("name")
      .eq("name", instituitionName)
      .maybeSingle();

    if (existingDataError) {
      return { msg: "something went wrong. try again", ok: false };
    }

    if (existingData) {
      return { msg: "instituition already exists", ok: false };
    }

    const file = instituitionLogo;

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(`Logos/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return { msg: "something went wrong. try again", ok: false };
    }

    const { data: logoUrl } = supabase.storage
      .from("images")
      .getPublicUrl(`Logos/${fileName}`);

    const { error: insertError } = await supabase.from("instituitions").insert({
      name: instituitionName,
      abbr: instituitionAbbr,
      about: instituitionAbout,
      logo: logoUrl.publicUrl,
    });

    if (insertError) {
      return { msg: "failed to add instuition, try again", ok: false };
    }

    await redis.del("instituitions");

    return { msg: "instituition added success", ok: true };
  } catch (err) {
    console.error(err);
    return { msg: "server error", ok: false };
  }
};
