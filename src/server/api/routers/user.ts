import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signUpUser, verifyUser } from "../../controller/user.controller";

export const userRouter = createTRPCRouter({
  greeting: publicProcedure.query(() => "hello8"),

  // * create user
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const signupRes = await signUpUser(input);
      console.log("signupRes", signupRes);
      return signupRes;
    }),

  // * verify otp
  verifyOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const verifyRes = verifyUser(input);
      console.log("verifyRes", verifyRes);
      return verifyRes;
    }),

  // * login
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
