import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { CheckoutItemDetails } from "."
import { WhiteBlock } from "./white-block"
import { Button, Skeleton } from "../ui"
import { cn } from "@/shared/lib/utils"

type PropsType = {totalPrice: number, deliveryPrice: number, taxPrice: number, loading: boolean, disabled: boolean }

export const OrderSidebar = ({totalPrice, deliveryPrice, taxPrice, loading, disabled }: PropsType) => {
  return (
    <div className={cn("w-[450px]", {"opacity-50 pointer-events-none	": loading})}>
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              {loading ? <Skeleton className="w-40 h-10"/> : <span className="text-[34px] font-extrabold">{totalPrice} ₽</span> }
              
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-1 text-gray-300" />
                  Стоимость товаров:
                </div>
              }
              value={loading ? <Skeleton className="w-20 h-7"/> : `${totalPrice} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-1 text-gray-300" />
                  Налоги:
                </div>
              }
              value={loading ? <Skeleton className="w-20 h-7"/> :`${taxPrice} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-1 text-gray-300" />
                  Доставка:
                </div>
              }
              value={loading ? <Skeleton className="w-20 h-7"/> :`${deliveryPrice} ₽`}
            />

            <Button
              loading={disabled}
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
