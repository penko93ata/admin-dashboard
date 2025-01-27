import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { comments } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string().min(1), postId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(comments).values({
        text: input.text,
        postId: input.postId,
        authorId: ctx.session.user.id,
      });
    }),
  getLatests: publicProcedure.query(async ({ ctx }) => {
    const comments = await ctx.db.query.comments.findMany({
      orderBy: (comments, { desc }) => [desc(comments.createdAt)],
    });

    return comments ?? null;
  }),
  updateComment: protectedProcedure
    .input(z.object({ text: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .update(comments)
        .set({
          text: input.text,
        })
        .where(eq(comments.authorId, ctx.session.user.id));
    }),
});
