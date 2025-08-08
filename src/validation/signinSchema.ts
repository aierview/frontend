import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Formato de email invalido."),
  password: z.string().min(6, "Senha inválida"),
});

export type SigninFormData = z.infer<typeof signinSchema>;
