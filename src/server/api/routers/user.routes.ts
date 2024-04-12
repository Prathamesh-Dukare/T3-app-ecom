import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signUpUser, verifyUser } from "../../service/user.service";
import { getHash, getJwtToken } from "../../../utils";

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
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
      const verifyRes = await verifyUser(input);
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
        },
      });

      if (!user) {
        throw new Error("User not found with this email");
      }
      if (!user?.isVerified) {
        throw new Error("User is not verified yet.");
      }
      //  match password
      const hashedPassword = getHash(input.password);
      if (user.password !== hashedPassword) {
        throw new Error("Invalid email or password");
      }

      const token = getJwtToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      return {
        token: token,
      };
    }),

  // * get user
  getUser: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.user.id.toString(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),
});
