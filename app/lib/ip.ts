"use server";

import { headers } from "next/headers";

export const getIP = async () => {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    null
  );
};
