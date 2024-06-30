"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UserRegister } from "./schema";
import { InputType, ReturnType } from "./types";
import { get } from "@/lib/http-client";
import { User } from "@/schemas";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, email, password } = data;
  let response;

  try {
    response = await get("/api/test");
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath("/auth/register");
  return { data: response.data as User };
};

export const userRegister = createSafeAction(UserRegister, handler);
