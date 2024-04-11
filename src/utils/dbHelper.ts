import { db } from "../server/db";

export const findUserByToken = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  //   return db.user.findFirst({
  //     where: {
  //       token,
  //     },
  //   });
  return { id: 1, name: "John Doe" };
};
