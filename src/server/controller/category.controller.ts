import { db } from "../db";

export interface CategoryInterface {
  id: number;
  name: string;
  semanticId: string;
  isChecked: boolean;
}
export interface PaginatedCategories {
  categories: CategoryInterface[];
  pageCount: number;
  pageSize: number;
  currentPage: number;
}

async function getPaginatedCategories(
  offset: number,
  userId: string,
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
      include: {
        users: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
            unChecked: true,
          },
        },
      },
    });

    const markedCategories = categories.map((category) => {
      if (category.users.length > 0 && !category.users[0]?.unChecked) {
        return {
          id: category.id,
          name: category.name,
          semanticId: category.semanticId,
          isChecked: true,
        };
      } else {
        return {
          id: category.id,
          name: category.name,
          semanticId: category.semanticId,
          isChecked: false,
        };
      }
    });

    return {
      categories: markedCategories,
      pageCount: Math.ceil(totalCategories / 6),
      pageSize: 6,
      currentPage: 1,
    };
  } catch (e) {
    throw new Error((e as Error)?.message);
  }
}

async function markInterest(
  categoryId: number,
  check: boolean,
  userId: string,
): Promise<any> {
  try {
    const mapping = await db.userCategoryMapping.findFirst({
      where: {
        categoryId: categoryId,
        userId: userId,
      },
    });

    if (!mapping && check) {
      await db.userCategoryMapping.create({
        data: {
          categoryId: categoryId,
          userId: userId,
        },
      });
    } else if (mapping && !check) {
      await db.userCategoryMapping.update({
        where: {
          id: mapping.id,
        },
        data: {
          unChecked: true,
        },
      });
    } else if (mapping && check) {
      await db.userCategoryMapping.update({
        where: {
          id: mapping.id,
        },
        data: {
          unChecked: false,
        },
      });
    } else {
      throw new Error("Invalid operation");
    }

    return {
      message: "success",
    };
  } catch (e) {
    throw new Error((e as Error)?.message);
  }
}

export { getPaginatedCategories, markInterest };
