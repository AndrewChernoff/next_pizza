"use client";

import { Container, OrderAddressForm, OrderCart, OrderPersonalForm, OrderSidebar, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/order-page/schemas/checkout-form-schema";
import { DevTool } from "@hookform/devtools";


const VAT = 15;
const DELIVERY_PRICE = 250;

export default function Order() {
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
  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) =>
    console.log(data);

  const { items, changeQuantity, removeCartItemHandler, totalAmount } =
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
              items={items}
              removeCartItemHandler={removeCartItemHandler}
              onClickCountButton={onClickCountButton}
            />

            <OrderPersonalForm />

            <OrderAddressForm />
          </div>

          <OrderSidebar
            totalPrice={totalPrice}
            taxPrice={taxPrice}
            deliveryPrice={DELIVERY_PRICE}
          />
        </form>
      </FormProvider>
    </Container>
          <DevTool control={form.control} /> {/* set up the dev tool */}
</>
  );
}