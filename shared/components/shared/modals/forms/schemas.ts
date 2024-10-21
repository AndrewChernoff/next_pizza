import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Парооль должен содержать ек менее 6 символов" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // path of error
  });

export type FormLoginSchemaType = z.infer<typeof formLoginSchema> 
export type FormRegisterSchemaType = z.infer<typeof formRegisterSchema> 
