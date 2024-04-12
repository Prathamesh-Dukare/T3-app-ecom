import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateCategories } from "../../../utils/general";
import { getPaginatedCategories } from "../../controller/category.controller";

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

  // * Get paginated categories
  GetAll: privateProcedure
    .input(
      z.object({
        offset: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = await getPaginatedCategories(input.offset);
      console.log(input.offset, data?.categories.length, "data");
      return data;
    }),
});
