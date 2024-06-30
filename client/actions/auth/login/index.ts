"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UserLogin } from "./schema";
import { InputType, ReturnType } from "./types";
import { get } from "@/lib/http-client";
import { User } from "@/schemas";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password } = data;
  let response = await get("/api/test");

  try {
  } catch (error) {
    return {
      error: "Failed to login",
    };
  }

  revalidatePath("/auth/login");
  return { data: response.data as User };
};

export const userLogin = createSafeAction(UserLogin, handler);
