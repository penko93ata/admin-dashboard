import { eq } from "drizzle-orm";
import { z } from "zod";
import { updatePostSchema } from "~/schema/updatePost.schema";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        title: input.title,
        body: input.body,
        createdById: ctx.session.user.id,
      });
    }),

  // createManually: publicProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       body: z.string().min(1),
  //       authorId: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(posts).values({
  //       title: input.title,
  //       body: input.body,
  //       createdById: input.authorId,
  //     });
  //   }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });

    return posts ?? null;
  }),

  getPostById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, input),
        with: {
          author: true,
        },
      });

      return post ?? null;
    }),

  getLatestPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      limit: 5,
      with: {
        author: true,
      },
    });

    return posts ?? null;
  }),

  updatePost: publicProcedure
    .input(z.object({ id: z.number() }).merge(updatePostSchema))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(posts)
        .set({
          title: input.title,
          body: input.body,
        })
        .where(eq(posts.id, input.id))
        .returning({
          createdById: posts.createdById,
          updatedAt: posts.updatedAt,
        });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
