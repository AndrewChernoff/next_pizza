import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../title";
import { FormInput } from "../../form-components";
import { Button } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import phoneIcon from '@/public/phone-icon.png'
import toast from "react-hot-toast";

type PropsType = {
  onClose: VoidFunction;
};

export const LoginForm = ({ onClose }: PropsType) => {
  const form = useForm<FormLoginSchemaType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginSchemaType) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт')
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Не удалось войти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name={"email"} label="E-Mail" required />

        <FormInput name={"password"} label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {form.formState.isSubmitting ? "Вход..." : "Войти"}
        </Button>
      </form>
    </FormProvider>
  );
};
