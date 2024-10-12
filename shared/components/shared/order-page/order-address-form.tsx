import { FormInput, FormTextarea } from "../form-components";
import { AddressInputForm } from "../form-components/address-input-form";
import { WhiteBlock } from "../white-block";

export const OrderAddressForm = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        {/* <FormInput
          name="address"
          className="text-base"
          placeholder="Введите адресс..."
        /> */}
        <AddressInputForm name="address"/>
        <FormTextarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Комментарий к закзау"
        />
      </div>
    </WhiteBlock>
  );
};
