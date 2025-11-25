import * as yup from "yup";

export interface LoginFormData {
  email: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(3, "Senha deve ter no mínimo 6 caracteres"),
});
