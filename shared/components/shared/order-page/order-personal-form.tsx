import { WhiteBlock } from "../white-block"
import { Input } from "../../ui"
import { FormInput } from "../form-components/form-input"
import { useFormContext } from "react-hook-form"


export const OrderPersonalForm = () => {


  return (
    <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <FormInput name="firstName" className="text-base" placeholder="Имя" />
              <FormInput
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <FormInput name="email" className="text-base" placeholder="E-Mail" />
              {/* <Input name="phone" className="text-base" placeholder="Телефон" /> */}
              <FormInput name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
  )
}
