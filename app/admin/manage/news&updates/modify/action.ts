"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const UpdateNews = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const category = (formData.get("category") as string).trim().toLowerCase();
  const title = (formData.get("title") as string).trim().toLowerCase();
  const news = (formData.get("news") as string).trim().toLowerCase();
  const file = formData.get("image") as File;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (!title || !news) {
      return { err: "empty input field", msg: "" };
    }

    if (!file || file.size === 0) {
      const { error: updateError } = await supabase0
        .from("news")
        .update({
          title: title,
          news: news,
        })
        .eq("id", id);

      if (updateError) {
        return { err: "failed to update news. try again", msg: "" };
      }

      return { msg: "news updated successfully", err: "" };
    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: newsUrl, error: newsUrlError } = await supabase0
      .from("news")
      .select("file")
      .eq("id", id)
      .single();

    if (!newsUrl || newsUrlError) {
      return { err: "failed to fetch news file url", msg: "" };
    }

    //get the file path
    const fileUrl = newsUrl.file;
    const path = decodeURIComponent(fileUrl.split("/news_images"))[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase0.storage
      .from("news_images")
      .remove([path]);

    if (storageDeleteError) {
      return {
        err: "failed to remove previous news file from storage",
        msg: "",
      };
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("news_images")
      .upload(`News/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return {
        err: "failed to save new news file to storage. try again",
        msg: "",
      };
    }

    const { data: Url } = supabase0.storage
      .from("news_images")
      .getPublicUrl(`News/${category}/${fileName}`);

    const { error: updateError } = await supabase0
      .from("news")
      .update({
        title: title,
        news: news,
        image: Url.publicUrl,
      })
      .eq("id", id);

    if (updateError) {
      return {
        err: "failed to update news. try again",
        msg: "",
      };
    }

    return {
      msg: "news updated successfully",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};
