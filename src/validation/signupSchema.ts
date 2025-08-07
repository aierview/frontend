// validation/signupSchema.ts
import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:";'<>?,./]).{6,}$/;

export const signupSchema = z
  .object({
    name: z.string().min(6, "Informa seu nome completo."),
    email: z.string().email("Formato de email invalido."),
    role: z.string("Informa sua funcao."),
    password: z
      .string()
      .regex(
        passwordRegex,
        "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
      )
      .min(
        6,
        "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
