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
  if (!token) {
    return null;
  }
  const jwtDecoded = verifyJwtToken(token);
  return jwtDecoded as JwtDecodedInterface;
}
