import { z } from "zod";

export const usersPostSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export type UsersPostSchema = z.infer<typeof usersPostSchema>;
