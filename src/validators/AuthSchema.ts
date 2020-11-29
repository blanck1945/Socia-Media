import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required("Confime su contraeña")
    .min(6, "Contraseña require como minimo 6 caracteres"),
  password: yup
    .string()
    .required("Contraseña es requerido")
    .min(6, "Contraseña require como minimo 6 caracteres"),
  email: yup.string().email().required("Email es requerido"),
  user: yup
    .string()
    .required("Usario es requerido")
    .min(5, "Usario require como minimo 5 caracteres"),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().required("Email es requerido"),
  password: yup.string().required("Password es requerido"),
});

export const validateSchema = async (schema, object) => {
  try {
    return await schema.validate(object);
  } catch (err) {
    return err;
  }
};
