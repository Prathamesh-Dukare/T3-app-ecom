import { Prisma } from "@prisma/client";
import { db } from "../../config/db";
import { generateOtp, getHash, getJwtToken } from "../../utils";
import { sendOtpMail } from "./mail.service";

async function signUpUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const otp = generateOtp();
    await db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: getHash(input.password),
        signUpOtp: otp,
      },
    });

    // send otp email
    await sendOtpMail(otp, input.email).catch((e) => {
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
    const token = getJwtToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      token,
    };
  } catch (e) {
    console.log("error in verifying otp", e);
    throw new Error("Invalid OTP");
  }
}

export { signUpUser, verifyUser };
