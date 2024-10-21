"use client";

import { Container, OrderAddressForm, OrderCart, OrderPersonalForm, OrderSidebar, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/order-page/schemas/checkout-form-schema";
import { DevTool } from "@hookform/devtools";
import createUser from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";


const VAT = 15;
const DELIVERY_PRICE = 250;

export default function Order() {

  const [orderLoading, setOrderLoading] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });
  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setOrderLoading(true)
      const url = await createUser(data);
      form.reset()
      toast.success('Заказ оформлен! Переход на оплату...')

      /* if (url) {
        window.location.assign(url)
      } */
      setOrderLoading(false)
      
    } catch(err) {
      toast.error('Не удалось создать заказ', {
        icon: ''
      })
    } finally {
      setOrderLoading(false)
    }
    
  }

  const { items, changeQuantity, removeCartItemHandler, totalAmount, loading } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    type === "plus"
      ? changeQuantity(id, quantity + 1)
      : changeQuantity(id, quantity - 1);
  };

  const taxPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice;

  console.log(items);
  

  return (
<>
<Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form className="flex gap-10"  onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <OrderCart
              loading={loading}
              items={items}
              removeCartItemHandler={removeCartItemHandler}
              onClickCountButton={onClickCountButton}
            />

            <OrderPersonalForm loading={loading} />

            <OrderAddressForm loading={loading} />
          </div>

          <OrderSidebar
            disabled={orderLoading}
            totalPrice={totalPrice}
            taxPrice={taxPrice}
            deliveryPrice={DELIVERY_PRICE}
            loading={loading}
          />
        </form>
      </FormProvider>
    </Container>
          <DevTool control={form.control} /> {/* set up the dev tool */}
</>
  );
}