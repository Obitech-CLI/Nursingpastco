"use server";

import { CategoryType } from "../types/types";
import { redis } from "./redis";
import { supabase0 } from "./supabase/supabase0";
import { supabase1 } from "./supabase/supabase1";

export const getContentsCategories = async () => {
  try {
    const { data, error } = await supabase0
      .from("contents_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { error: "failed to fetch categories. try again" };
    }

    if (data.length === 0) {
      return { error: "no category found" };
    }

    return { categories: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};

export const getNewsCategories = async () => {
  try {
    const { data, error } = await supabase0
      .from("news_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { error: "failed to fetch categories. try again" };
    }

    if (data.length === 0) {
      return { error: "no category found" };
    }

    return { categories: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};

export const getRecommendationsCategories = async () => {
  try {
    const { data, error } = await supabase0
      .from("recommendations_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { error: "failed to fetch categories. try again" };
    }

    if (data.length === 0) {
      return { error: "no category found" };
    }

    return { categories: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};

export const getNMCNCategories = async () => {
  try {
    const { data, error } = await supabase1
      .from("nmcn_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { error: "failed to fetch categories. try again" };
    }

    if (data.length === 0) {
      return { error: "no category found" };
    }

    return { categories: data };
  } catch (err) {
    console.error(err);
    return { error: "server error" };
  }
};
