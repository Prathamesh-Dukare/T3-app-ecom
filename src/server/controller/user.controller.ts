import { Prisma } from "@prisma/client";
import { db } from "../db";
import { generateOtp, getHash, getJwtToken } from "../../utils/general";
import { sendOtpMail } from "../../utils/mail";

async function signUpUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const otp = generateOtp();
    const user = await db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: getHash(input.password),
        signUpOtp: otp,
      },
    });

    // no need to wait
    sendOtpMail(otp, input.email).catch((e) => {
      console.log("error in sending otp mail", e);
    });

    return {
      success: true,
      message: "OTP sent successfully. Please verify your email.",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2002":
          console.log("A user with this email already exists.");
          throw new Error("A user with this email already exists.");
        default:
          console.log("An unknown error occurred while signing up.");
      }
    } else {
      console.log("error in signup", e);
    }
  }
}

async function verifyUser(input: { email: string; otp: string }) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: input.email,
        signUpOtp: Number(input.otp),
      },
    });

    if (!user) {
      throw new Error("Invalid OTP");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        signUpOtp: null,
      },
    });

    // jwt token generation
    const token = getJwtToken({ id: user.id });
    return {
      token,
    };
  } catch (e) {
    console.log("error in verifying otp", e);
    throw new Error("Invalid OTP");
  }
}

export { signUpUser, verifyUser };
