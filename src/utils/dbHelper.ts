import { verifyJwtToken } from "./general";

export interface JwtDecodedInterface {
  id: number;
  email: string;
  name: string;
  isVerified: boolean;
}

export function findUserByToken(
  token: string | undefined,
): JwtDecodedInterface | null {
  if (!token || token === "undefined") {
    return null;
  }
  try {
    return verifyJwtToken(token) as JwtDecodedInterface;
  } catch (e) {
    return null;
  }
}
