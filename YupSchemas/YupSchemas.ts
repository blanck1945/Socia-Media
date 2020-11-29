import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export const validateYupSchema = (schema: any, fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await schema.validate(req.body);
    return fn(req, res);
  } catch (err) {
    return res.status(404).json({
      msg: err.message,
    });
  }
};

export const validateSchema = async (schema: any, values: any) => {
  try {
    await schema.validate(values);
    return true;
  } catch (err) {
    return err;
  }
};

export const commentSchema = new yup.object().shape({
  comment: yup
    .string()
    .trim()
    .required("Commentario no puede estar en blanco")
    .max(149, "Comentario no puede tener mas de 149 caracteres"),
});

export const signUpSchema = new yup.object().shape({
  confirmPassword: yup
    .string()
    .required("Contraseña es requerido")
    .min(6, "Contraseña require comom minimo 6 caracteres")
    .trim(),
  password: yup
    .string()
    .required("Contraseña es requerido")
    .min(6, "Contraseña require comom minimo 6 caracteres")
    .trim(),
  email: yup.string().required("Email es requerido").email().trim(),
  user: yup.string().required("Usuario es requerido").trim(),
});

export const signInSchema = new yup.object().shape({
  password: yup
    .string()
    .required("Contraseña es requerido")
    .min(6, "Contraseña require comom minimo 6 caracteres"),
  email: yup.string().required("Email es requerido").email(),
});
