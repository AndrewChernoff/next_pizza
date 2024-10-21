import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

export const createPayment = async (values: any): Promise<PaymentData> => {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: values.price,
        currency: "RUB",
      },
      capture: true,
      description: values.description,
      confirmation: {
        type: "redirect",
        return_url: process.env.YOKASSA_CALLBACK_URL,
      },
      metadata: {
        order_id: values.order_id,
      },
    },
    {
      auth: {
        username: "391809",
        password: process.env.YOOMONEY_API_KEY as string,
      },
      headers: {
        "Idempotence-Key": Math.random().toString(36).substring(7),
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
