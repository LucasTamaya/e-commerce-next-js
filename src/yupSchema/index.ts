import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("This email address is invalid")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("This field is required"),
}).required();

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("This email address is invalid")
    .required("This field is required"),
  name: Yup.string()
    .min(2, "This name is invalid")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("This field is required"),
}).required();
