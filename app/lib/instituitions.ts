"use server";

import { InstitutionType } from "../types/types";
import { redis } from "./redis";
import { supabase } from "./supabase/supabase";

type Type = {
  instituitions?: InstitutionType[];
  error?: string;
};

export const getInstituitions = async (): Promise<Type> => {
  try {
    let query = supabase
      .from("instituitions")
      .select("*")
      .order("created_at", { ascending: true });

    const { data, error } = await query;

    if (error) {
      return { error: "failed to fetch instituitions. try again" };
    }

    if (data.length === 0) {
      return { error: "no instituition found" };
    }

    return { instituitions: data };
  } catch (err) {
    console.error(err);
    return {
      error:
        "something went wrong. please check your internet connection and try again.",
    };
  }
};
