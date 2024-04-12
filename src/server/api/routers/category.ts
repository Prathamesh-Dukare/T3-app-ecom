import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateCategories } from "../../../utils/general";
import {
  getPaginatedCategories,
  markInterest,
} from "../../controller/category.controller";

export const categoryRouter = createTRPCRouter({
  // * init fake data into categories table
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

  // * get paginated categories
  getAll: privateProcedure
    .input(
      z.object({
        offset: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await getPaginatedCategories(input.offset, ctx.user.id);
      console.log(input.offset, data?.categories.length, "data");
      return data;
    }),

  // * mark interesest
  markInterest: privateProcedure
    .input(
      z.object({
        categoryId: z.number(),
        check: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateRes = await markInterest(
        input.categoryId,
        input.check,
        ctx.user.id,
      );
      return updateRes;
    }),
});
