import { PizzaSize, PizzaType } from "@/shared/constants/pizza"
import { getCartItemDetailes } from "@/shared/lib"
import { CartStateItem } from "@/shared/lib/get-cart-details"
import { WhiteBlock } from "../white-block"
import { OrderItem } from "../order-item"

type PropsType = {
    items: CartStateItem[]
    removeCartItemHandler: (id: number) => void
    onClickCountButton:  (id: number, quantity: number, type: 'plus' | 'minus') => void
}

export const OrderCart = ({items, removeCartItemHandler, onClickCountButton} : PropsType) => {

    
  return (
    <WhiteBlock title="1. Корзина">
            {items.map((el) => (
              <OrderItem
                key={el.id}
                className="mb-5"
                id={el.id}
                imageUrl={el.imageUrl}
                details={
                  el.pizzaSize && el.pizzaType
                    ? getCartItemDetailes(
                        el.pizzaType as PizzaType,
                        el.pizzaSize as PizzaSize,
                        el.ingredients as any
                      )
                    : ""
                }
                name={el.name}
                price={el.price}
                disabled={el.disabled}
                quantity={el.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(el.id, el.quantity, type)
                }
                onClickRemove={() => removeCartItemHandler(el.id)}
              />
            ))}
          </WhiteBlock>
  )
}
