import * as yup from "yup";

export const AuthValidationsSchema = yup.object().shape({
  email: yup
    .string()
    .required("Required")
    .min(4, "Email must be more than 3 characters")
    .max(60, "Email must be less than 60 characters")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      "User email, must be a valid email"
    ),
  password: yup
    .string()
    .required("Required")
    .min(4, "Password must be more than 3 characters")
    .max(60, "Password must be less than 60 characters")
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z])\S{4,}$/,
      "Пароль повинен містити хоча б дві букви без пробілів"
    ),
});
