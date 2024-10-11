import { Cart, Ingredient } from "@prisma/client"
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza"
import { CartStateItem } from "./get-cart-details"


export const getCartItemDetailes = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: Ingredient[]
): string => {
    const detailes = []

    if(pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType]
        detailes.push(`${typeName} см`)
    }

    if(ingredients) {
        detailes.push(...ingredients.map(el => el.name))
    }

    

    return detailes.join(', ')
}
