import { prisma } from "@/prisma/prisma-client";

export type SearchParamsType = {
  priceFrom?: string,
  priceTo?: string,
  pizzaTypes?: string,
  sizes?: string,
  ingredients?: string
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async(params: SearchParamsType) => {
    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
    const sizes = params.sizes?.split(',').map(Number)
    const ingredientsIds = params.ingredients?.split(',').map(Number)
    

    const categories = await prisma.category.findMany({
        include: {
          products: {
            orderBy: {
              id: 'desc',
            },
            where: {
              ingredients: ingredientsIds
                ? {
                    some: {
                      id: {
                        in: ingredientsIds,
                      },
                    },
                  }
                : undefined,
              items: {
                some: {
                  size: {
                    in: sizes,
                  },
                  pizzaType: {
                    in: pizzaTypes,
                  },
                  price: {
                    gte: minPrice, // >=
                    lte: maxPrice, // <=
                  },
                },
              },
            },
            include: {
              ingredients: true,
              items: {
                where: {
                  price: {
                    gte: minPrice,
                    lte: maxPrice,
                  },
                },
                orderBy: {
                  price: 'asc',
                },
              },
            },
          },
        },
      });
    
      return categories;
}
