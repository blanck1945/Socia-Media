import { isEmail, isEmpty } from "./validators";

interface Body {
  user?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  bio?: string;
  website?: string;
  location?: string;
}

interface Details {}

export const validateRequest = (res: any, body: Body) => {
  let validations = [];

  for (const [key, value] of Object.entries(body)) {
    validations.push({
      [key]: isEmpty(value) === undefined ? "" : isEmpty(value),
    });
  }

  if (body.website) {
    body.website.trim().substring(0, 4) !== "http"
      ? (body.website = `http://${body.website.trim()}`)
      : body.website;
  }

  const requireError = checkErrors(validations);
  if (requireError) {
    return formatResponse(res, requireError);
  }

  if (body.email) {
    const emailError = checkEmail(body.email);
    if (emailError) {
      return formatResponse(res, emailError);
    }
  }
  if (body.confirmPassword) {
    const checkPass = checkEqualPassword(body.password, body.confirmPassword);
    if (checkPass) {
      return formatResponse(res, checkPass);
    }
  }

  return true;
};

const formatResponse = (res, error: any) => {
  res.status(400).json({
    ...error,
    valid: false,
  });
};

const checkEqualPassword = (pass: string, pass2: string) => {
  return pass !== pass2
    ? {
        msg: "Error de validación",
        password: "Las contraseñas no coinciden",
      }
    : false;
};

const checkEmail = (email: string) => {
  const checkEmail = isEmail(email);
  if (!checkEmail) {
    return {
      msg: "Error de validación",
      email: "Email no es valido",
    };
  } else return false;
};

export const checkErrors = (validateFields: any) => {
  let errors = [];
  let asignErr;
  validateFields.map((obj) => {
    Object.values(obj).map((el) => {
      if (el !== "") {
        errors.push(obj);
        asignErr = true;
      }
    });
  });

  if (asignErr) {
    return {
      msg: "Error de validación",
      errors: errors,
    };
  } else return false;
};

export const validateOneField = (value: string, field: string) => {
  if (value.trim() === "") {
    return "esta vacio";
  }
};
