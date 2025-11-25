import * as yup from "yup";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),

  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),

  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});
