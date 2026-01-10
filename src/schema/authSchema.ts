import * as z from "zod";

export const register = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["teacher", "student"]),
});

export type Register = z.infer<typeof register>;
