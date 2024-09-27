import { Ingredient } from "@prisma/client"
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza"


export const getCartItemDetailes = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: Ingredient[]
): string => {
    const detailes = []

    if(pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType]
        detailes.push(`${typeName} ${typeName} см`)
    }

    if(ingredients) {
        detailes.push(...ingredients.map(el => el.name))
    }

    return detailes.join(', ')
}
