import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
    });

    return user ?? null;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, input),
      columns: {
        emailVerified: false,
        image: false,
      },
      with: {
        posts: true,
      },
    });

    return user ?? null;
  }),
});
