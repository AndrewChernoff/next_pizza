import { CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";

export default function Checkout() {
  return (
    <Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">sadfasefsgd</WhiteBlock>

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

        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">3568 ₽</span>
            </div>

            <CheckoutItemDetails title={"Стоимость товаров:"} value="3000 ₽"/>
            <CheckoutItemDetails title={"Налоги:"} value="3000 ₽"/>
            <CheckoutItemDetails title={"Доставка:"} value="3000 ₽"/>
           
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}

