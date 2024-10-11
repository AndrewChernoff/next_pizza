'use client'

import {
  CheckoutItemDetails,
  Container,
  OrderItem,
  OrderSidebar,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks/use-cart";
import { getCartItemDetailes } from "@/shared/lib";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function Order() {

  const {items, changeQuantity, removeCartItemHandler, totalAmount } = useCart()

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    //const quantityNumber = quantity
      type === 'plus' ? changeQuantity(id, quantity + 1) : changeQuantity(id, quantity - 1) 
  }

const taxPrice = (totalAmount * VAT) / 100
const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice

  return (
    <Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
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

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Введите адресс..."
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарий к закзау"
              />
            </div>
          </WhiteBlock>
        </div>

        <OrderSidebar totalPrice={totalPrice} taxPrice={taxPrice} deliveryPrice={DELIVERY_PRICE}/>
        {/* <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-1 text-gray-300" />
                  Стоимость корзины:
                </div>
              }
              value={`${totalPrice} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-1 text-gray-300" />
                  Налоги:
                </div>
              }
              value={`${taxPrice} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-1 text-gray-300" />
                  Доставка:
                </div>
              }
              value={`${DELIVERY_PRICE} ₽`}
            />

            <Button
              type="button"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div> */}
      </div>
    </Container>
  );
}

///15 56
