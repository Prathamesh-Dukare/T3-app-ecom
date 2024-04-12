import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateCategories } from "../../../utils/general";

export const categoryRouter = createTRPCRouter({
  // * Init fake data into categories table
  initFakeData: publicProcedure.mutation(async ({ ctx }) => {
    const fakeEntries = generateCategories(100);
    const initRes = await ctx.db.category.createMany({
      data: [
        ...fakeEntries.map((entry) => {
          return {
            name: entry.name,
            semanticId: entry.semantic_id,
          };
        }),
      ],
    });
    console.log(initRes, "initRes");
    return initRes;
  }),

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

  // todo : add verify email by otp private routee

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
});
