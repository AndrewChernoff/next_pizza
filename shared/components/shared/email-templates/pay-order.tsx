import * as React from 'react';

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  orderId, totalAmount, paymentUrl
}) => (
  <div>
    <h1>Заказ #{orderId}!</h1>
    <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдие <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.</p>
  </div>
);
