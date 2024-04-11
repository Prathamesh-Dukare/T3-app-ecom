import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  greeting: publicProcedure.query(() => "hello8"),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          password: input.password,
        },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return user;
    }),

  //   getLatest: publicProcedure.query(({ ctx }) => {
  //     return ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });
  //   }),
});
