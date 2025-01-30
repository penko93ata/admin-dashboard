import { z } from "zod";

export const updatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Body is required" }),
  // author: z.string().min(1, { message: "Author is required" }),
  // date: z.date().default(() => new Date()),
});
