import JWT from "jsonwebtoken";
import { createHmac } from "crypto";
import { env } from "../env";

function generateOtp(): number {
  const otp = Math.floor(10000000 + Math.random() * 90000000);
  return otp;
}

function getJwtToken(data: {
  id: string;
  name: string;
  email: string;
}): string {
  return JWT.sign(data, env.JWT_SECRET, {
    expiresIn: "10h",
  });
}

function verifyJwtToken(token: string) {
  return JWT.verify(token, env.JWT_SECRET);
}

function getHash(input: string) {
  const hash = createHmac("sha256", env.HASH_SALT).update(input).digest("hex");
  return hash;
}

export { generateOtp, getJwtToken, verifyJwtToken, getHash };
