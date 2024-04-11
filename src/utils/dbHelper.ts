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
  const jwtDecoded = verifyJwtToken(token as string);
  return jwtDecoded as JwtDecodedInterface;
}
