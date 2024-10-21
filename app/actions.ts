"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/order-page/schemas/checkout-form-schema";
import { sendEmail } from "@/shared/lib";
import { createPayment } from "@/shared/lib/create-payment";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export default async function createUser(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentValues = {
      order_id: order.id,
      price: userCart.totalAmount,
      description: "Оплата заказа #" + order.id,
    };

    const paymentData = await createPayment(paymentValues);

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });
    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(data.email, "Заказ", {
      orderId: order.id,
      totalAmount: userCart.totalAmount,
      paymentUrl,
    });

    return paymentUrl;
  } catch (error) {
    console.log("[[CreateOrder] Server error", error);
  }
}
