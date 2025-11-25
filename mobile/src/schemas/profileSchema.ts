import * as yup from "yup";

export const profileSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter no mínimo 3 caracteres"),

  email: yup.string().email("E-mail inválido").optional(),

  oldPassword: yup
    .string()
    .transform((value) => value || undefined)
    .when("newPassword", {
      is: (value: string) => value && value.length > 0,
      then: (schema) =>
        schema.required("Informe a senha antiga para alterar a senha"),
      otherwise: (schema) => schema.optional(),
    }),

  newPassword: yup
    .string()
    .transform((value) => value || undefined)
    .test(
      "min-length",
      "A senha deve ter no mínimo 6 caracteres",
      function (value) {
        if (!value) return true;
        return value.length >= 6;
      }
    ),
});

export type ProfileFormData = {
  name: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
};
