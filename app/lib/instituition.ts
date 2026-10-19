"use server";

import { InstitutionType } from "../types/types";
import { supabase } from "./supabase/supabase";

type Type = {
  instituition?: InstitutionType;
  error?: string;
};

export const getInstituition = async (instituition: string): Promise<Type> => {
  try {
    let query = supabase
      .from("instituitions")
      .select("*")
      .eq("name", instituition)
      .order("created_at", { ascending: false })
      .single();

    const { data, error } = await query;

    if (!data || error) {
      return { error: "no instituition found" };
    }

    return { instituition: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
