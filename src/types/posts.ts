import { InferSelectModel } from "drizzle-orm";
import { type posts, type users } from "~/server/db/schema";

export type SelectUser = InferSelectModel<typeof users>;
export type SelectPost = InferSelectModel<typeof posts> & {
  author: SelectUser;
};
