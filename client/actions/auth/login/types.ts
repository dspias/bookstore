import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { UserLogin } from "./schema";
import { User } from "@/schemas";

export type InputType = z.infer<typeof UserLogin>;
export type ReturnType = ActionState<InputType, User>;
