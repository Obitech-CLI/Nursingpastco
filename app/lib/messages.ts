"use server";

import { MessageType } from "../types/types";
import { Admin } from "./admin";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

export const getMessages = async () => {
  await Admin();
  try {
    const cached = await redis.get<MessageType[]>("contact-messeges");
    if (cached) {
      return { messages: cached };
    }
    let query = supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch messages. try again" };
    }

    if (data.length === 0) {
      return { error: "no message found" };
    }

    await redis.set("contact-messages", data);

    return { messages: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
