import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { CheckoutItemDetails } from "."
import { WhiteBlock } from "./white-block"
import { Button } from "../ui"

type PropsType = {totalPrice: number, deliveryPrice: number, taxPrice: number }

export const OrderSidebar = ({totalPrice, deliveryPrice, taxPrice }: PropsType) => {
  return (
    <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-1 text-gray-300" />
                  Стоимость товаров:
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
              value={`${deliveryPrice} ₽`}
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
  )
}
