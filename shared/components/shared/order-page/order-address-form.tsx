import { cn } from "@/shared/lib/utils";
import { FormInput, FormTextarea } from "../form-components";
import { AddressInputForm } from "../form-components/address-input-form";
import { WhiteBlock } from "../white-block";

type PropsTRype = {
  loading: boolean
}

export const OrderAddressForm = ({loading}: PropsTRype) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={cn({"opacity-50 pointer-events-none" : loading})}>
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
