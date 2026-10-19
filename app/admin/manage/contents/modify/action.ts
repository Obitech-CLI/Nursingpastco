"use server";

import { supabase0 } from "@/app/lib/supabase/supabase0";

export const UpdateContents = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const category = (formData.get("category") as string).trim().toLowerCase();
  const title = (formData.get("title") as string).trim().toLowerCase();
  const content = (formData.get("content") as string).trim().toLowerCase();
  const file = formData.get("file") as File;
  try {
    if (!id) {
      return { err: "invalid request", msg: "" };
    }

    if (!title || !content) {
      return { err: "empty input field", msg: "" };
    }

    if (!file || file.size === 0) {
      const { error: updateError } = await supabase0
        .from("contents")
        .update({
          title: title,
          content: content,
        })
        .eq("id", id);

      if (updateError) {
        return { err: "failed to update content. try again", msg: "" };
      }

      return { msg: "content updated successfully", err: "" };
    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: contentUrl, error: contentUrlError } = await supabase0
      .from("contents")
      .select("file")
      .eq("id", id)
      .single();

    if (!contentUrl || contentUrlError) {
      return { err: "failed to fetch content file url", msg: "" };
    }

    //get the file path
    const fileUrl = contentUrl.file;
    const path = decodeURIComponent(fileUrl.split("/contents_files/"))[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase0.storage
      .from("contents_files")
      .remove([path]);

    if (storageDeleteError) {
      return {
        err: "failed to remove previous content file from storage",
        msg: "",
      };
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase0.storage
      .from("contents_files")
      .upload(`Contents/${category}/${fileName}`, file, {
        contentType: file.type,
      });

    if (storageError) {
      return {
        err: "failed to save new content file to storage. try again",
        msg: "",
      };
    }

    const { data: Url } = supabase0.storage
      .from("contents_files")
      .getPublicUrl(`Contents/${category}/${fileName}`);

    const { error: updateError } = await supabase0
      .from("contents")
      .update({
        title: title,
        content: content,
        file: Url.publicUrl,
      })
      .eq("id", id);

    if (updateError) {
      return {
        err: "failed to update content. try again",
        msg: "",
      };
    }

    return {
      msg: "content updated successfully",
      err: "",
    };
  } catch (err) {
    console.error(err);
    return { err: "server error", msg: "" };
  }
};

export const DeleteContent = async (prevData: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const confirm = formData.get("confirm") as string;
  try {
    if (!id) {
      return {
        err: "invalid request",
        msg: "",
      };
    }

    if (confirm.toLowerCase().trim() !== "i want to delete") {
      return { err: "invalid confirm message", msg: "" };
    }

    const { data: content, error: ContentError } = await supabase0
      .from("contents")
      .select("category, file")
      .eq("id", id)
      .single();

    if (!content || ContentError) {
      return {
        err: "couldnt get content file url. try again",
        msg: "",
      };
    }

    const fileUrl = content.file;
    const path = decodeURIComponent(fileUrl.split("/contents_files/")[1]);

    const { error } = await supabase0.from("contents").delete().eq("id", id);

    if (error) {
      return {
        err: "failed to delete content. try again",
        msg: "",
      };
    }

    const { error: storageError } = await supabase0.storage
      .from("contents_files")
      .remove([path]);

    if (storageError) {
      return {
        msg: "content deleted successfully but failed to remove previous file in storage.",
        err: "",
      };
    }

    return {
      msg: "content deleted successfully",
      err: "",
    };
  } catch (err) {
    console.log(err);
    return { err: "server error", msg: "" };
  }
};
