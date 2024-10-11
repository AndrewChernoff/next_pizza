import { Input, Textarea } from "../../ui";
import { WhiteBlock } from "../white-block";

export const OrderAddressForm = () => {
  return (
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
  );
};
