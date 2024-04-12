import JWT from "jsonwebtoken";
import { createHmac } from "crypto";
import { env } from "../env";
import { faker } from "@faker-js/faker";

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

function generateCategories(count: number) {
  const categories = [];
  for (let i = 0; i < count; i++) {
    const item = faker.commerce.department();
    const category = {
      name: item,
      semantic_id: item.toLowerCase(),
    };
    categories.push(category);
  }
  return categories;
}

export {
  generateOtp,
  getJwtToken,
  verifyJwtToken,
  getHash,
  generateCategories,
};
