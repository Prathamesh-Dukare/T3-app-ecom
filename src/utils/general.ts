import JWT from "jsonwebtoken";
import { createHmac } from "crypto";
import { env } from "../env";

function generateOtp(): number {
  const otp = Math.floor(10000000 + Math.random() * 90000000);
  return otp;
}

function getJwtToken(data: any) {
  return JWT.sign(data, env.JWT_SECRET, {
    expiresIn: "10h",
  });
}

function getHash(input: string, salt: string) {
  const hash = createHmac("sha256", salt).update(input).digest("hex");
  return hash;
}

export { generateOtp, getJwtToken, getHash };
