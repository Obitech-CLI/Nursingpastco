"use server";

import { redis } from "@/app/lib/redis";
import { supabase } from "@/app/lib/supabase/supabase";

export const updateInstituition = async (prevData: any, formData: FormData) => {
  const instituitionId = formData.get("instituition-id");
  const instituitionName = formData.get("instituition-name") as string;
  const instituitionAbbr = formData.get("instituition-abbr") as string;
  const instituitionAbout = formData.get("about-instituition") as string;
  const instituitionLogo = formData.get("instituition-logo") as File;

  const updated = await redis.hget("iUpdated", "updated");

  try {
    if (updated) {
      return { err: "resolve previous update to continue", msg: "" };
    }
    if (!instituitionName || !instituitionAbbr || !instituitionAbout) {
      return { err: "empty input detected", msg: "" };
    }

    const { data, error } = await supabase
      .from("instituitions")
      .select("name")
      .eq("id", instituitionId)
      .maybeSingle();

    if (error) {
      return { err: "something went wrong, try again", msg: "" };
    }

    const file = instituitionLogo;

    if (file.size) {
      const { data: logoUrl, error: logoUrlError } = await supabase
        .from("instituitions")
        .select("logo")
        .eq("id", instituitionId)
        .single();

      if (logoUrlError) {
        console.log("here");
        return { err: "something went wrong, try again", msg: "" };
      }

      const path = decodeURIComponent(logoUrl.logo.split("/images/")[1]);

      const { error: storageDeleteError } = await supabase.storage
        .from("images")
        .remove([path]);

      if (storageDeleteError) {
        return { err: "something went wrong. try again", msg: "" };
      }

      const fileName = `${Date.now()}-${file.name}`;

      const { error: storageError } = await supabase.storage
        .from("images")
        .upload(`Logos/${fileName}`, file, {
          contentType: file.type,
        });

      if (storageError) {
        return { err: "something went wrong, try again", msg: "" };
      }

      const { data: newLogoUrl } = supabase.storage
        .from("images")
        .getPublicUrl(`Logos/${fileName}`);

      const { error: updateError } = await supabase
        .from("instituitions")
        .update({
          name: instituitionName,
          abbr: instituitionAbbr,
          about: instituitionAbout,
          logo: newLogoUrl.publicUrl,
        })
        .eq("id", instituitionId);

      if (updateError) {
        return { err: "failed to update instituition, try again", msg: "" };
      }

      await redis.hset("iUpdated", {
        updated: true,
        old: data?.name,
        new: instituitionName,
      });

      await redis.del("instituitions");

      return { err: "instituition update success", msg: "" };
    }

    const { error: updateError } = await supabase
      .from("instituitions")
      .update({
        name: instituitionName,
        abbr: instituitionAbbr,
        about: instituitionAbout,
      })
      .eq("id", instituitionId);

    if (updateError) {
      return { err: "failed to update instituition, try again", msg: "" };
    }

    await redis.hset("iUpdate", {
      updated: true,
      old: data?.name,
      new: instituitionName,
    });

    await redis.del("instituitions");

    return { msg: "instituition update success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const deleteInstituition = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  const deleted = await redis.hget("iDeleted", "deleted");
  try {
    if (deleted) {
      return { err: "resolve previous delete to continue", msg: "" };
    }
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { data, error } = await supabase
      .from("instituitions")
      .select("name, logo")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return { err: "something went wrong, try again", msg: "" };
    }
    const path = decodeURIComponent(data?.logo.split("/images/")[1]);

    const { error: deleteError } = await supabase
      .from("instituitions")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return { err: "failed to delete instituition. try again", ok: false };
    }

    const { error: storageDeleteError } = await supabase.storage
      .from("images")
      .remove([path]);

    if (storageDeleteError) {
      return {
        msg: "instituition deleted success without storage cleanup",
        err: "",
      };
    }

    await redis.hset("iDeleted", {
      deleted: true,
      instituition: data?.name,
    });

    await redis.del("instituitions");

    return { msg: "instituition deleted success", err: "" };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
