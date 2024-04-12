import { Prisma } from "@prisma/client";
import { db } from "../db";

export interface PaginatedCategories {
  categories: Prisma.CategoryUncheckedCreateInput[];
  pageCount: number;
  pageSize: number;
  currentPage: number;
}

async function getPaginatedCategories(
  offset: number,
): Promise<PaginatedCategories | undefined> {
  try {
    const totalCategories = await db.category.count();
    const categories = await db.category.findMany({
      take: 6,
      orderBy: {
        id: "asc",
      },
      cursor: {
        id: offset || 1,
      },
    });

    return {
      categories: categories,
      pageCount: Math.ceil(totalCategories / 6),
      pageSize: 6,
      currentPage: 1,
    };
  } catch (e) {}
}

export { getPaginatedCategories };
