import * as yup from "yup";
import { UserRole } from "../types";

export const createProductSchema = yup.object({
  title: yup.string().required("Це поле є обов'язковим"),
  price: yup.number().required("Це поле є обов'язковим"),
  categories: yup
    .array()
    .of(yup.string().required("Це поле є обов'язковим"))
    .required("Це поле є обов'язковим"),
  characteristics: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Це поле є обов'язковим"),
        description: yup
          .array()
          .of(yup.string().required("Це поле є обов'язковим"))
          .required("Це поле є обов'язковим"),
      })
    )
    .required("Це поле є обов'язковим"),
  inStock: yup.boolean().default(false),
});

export const updateProductSchema = yup.object({
  title: yup.string(),
  price: yup.number(),
  categories: yup.array().of(yup.string()),
  characteristics: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      description: yup.array().of(yup.string()),
    })
  ),
  inStock: yup.boolean().default(false),
});

const nameRegex = /^[A-Aa-Я]+$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createReviewsSchema = yup.object({
  rating: yup.number().required("Це поле є обов'язковим"),
  advantages: yup.string().required("Це поле є обов'язковим"),
  disadvantages: yup.string().required("Це поле є обов'язковим"),
  comment: yup.string(),
  userName: yup
    .string()
    .min(1, "Занадто коротко")
    .max(80, "Занадто довге")
    .matches(nameRegex, "Некоректне ім'я")
    .required(),
  userEmail: yup.string().matches(emailRegex, "Некоректний email").required(),
});

export const updateReviewsSchema = yup.object({
  rating: yup.number(),
  advantages: yup.string(),
  disadvantages: yup.string(),
  comment: yup.string(),
  userName: yup.string().max(80, "Занадто довге"),
  userEmail: yup.string().email(),
});

export const updateOrderSchema = yup.object().shape({
  email: yup.string().email(),
  orderStatus: yup.string(),
  customerPhone: yup.string(),
  totalPrice: yup.number(),
  paymentStatus: yup.string(),
  paymentMethod: yup.string(),
  products: yup.array().of(
    yup.object().shape({
      productId: yup.string(),
      title: yup.string(),
      price: yup.number(),
      quantity: yup.number(),
      poster: yup.string(),
    })
  ),
  recepient: yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
  }),
  deliveryAddress: yup.object().shape({
    city: yup.string(),
    postalOperator: yup.string(),
    postalDepartment: yup.string(),
    personalAddress: yup.object().shape({
      street: yup.string(),
      house: yup.string(),
      apartment: yup.number().min(0),
    }),
  }),
});

export const createOrderSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Некоректний email")
    .required("Email є обов'язковим"),
  orderStatus: yup.string().required("Це поле обов'язкове"),
  customerPhone: yup
    .string()
    .matches(/^\+?3?8?(0\d{9})$/, "Некоректний номер телефону")
    .required("Це поле обов'язкове"),
  totalPrice: yup
    .number()
    .typeError("Це має бути число")
    .positive("Ціна має бути позитивною")
    .min(1, "Мінімальна ціна 1")
    .max(100000, "Максимальна ціна - 100000")
    .required("Це поле обов'язкове"),
  paymentStatus: yup.string().required("Це поле обов'язкове"),
  paymentMethod: yup.string().required("Це поле обов'язкове"),
  products: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          productId: yup.string().required("Це поле обов'язкове"),
          title: yup
            .string()
            .typeError("Це має бути рядок")
            .required("Це поле обов'язкове"),
          price: yup
            .number()
            .typeError("Це має бути число")
            .positive("Ціна має бути позитивною")
            .min(1, "Мінімальна ціна - 1")
            .max(100000, "Максимальна ціна - 100000")
            .required("Це поле обов'язкове"),
          quantity: yup
            .number()
            .typeError("Це має бути число")
            .positive("Кількість має бути позитивною")
            .min(1, "Мінімальна кількість - 1")
            .max(1000, "Максимальна кількість - 1000")
            .integer("Кількість має бути цілим числом")
            .required("Це поле обов'язкове"),
          poster: yup
            .string()
            .url("Некоректна URL адреса")
            .required("Це поле обов'язкове"),
        })
        .required("Це поле обов'язкове")
    )
    .required("Це поле обов'язкове"),
  recepient: yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
        "User name, must be contain only letters"
      )
      .required("Це поле обов'язкове"),
    phone: yup
      .string()
      .matches(/^[\+]{0,1}380/, "Number should start with code of Ukraine +380")
      .matches(/^[\+]{0,1}380([0-9]{9})$/, "And contain 9 numbers")
      .required("Це поле обов'язкове"),
  }),
  deliveryAddress: yup
    .object()
    .shape({
      city: yup.string().required("Це поле обов'язкове"),
      postalOperator: yup.string().required("Це поле обов'язкове"),
      postalDepartment: yup.string().required("Це поле обов'язкове"),
      personalAddress: yup
        .object()
        .shape({
          street: yup
            .string()
            .min(3, "Від 3 символів")
            .required("Це поле обов'язкове"),
          house: yup
            .string()
            .max(10, "House number must be less than 10 characters")
            .matches(
              /^(?!\s)[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ0-9\s]*$/,
              "House must contain only letters, numbers"
            )
            .required("Це поле обов'язкове"),
          apartment: yup
            .number()
            .min(1, "Замало, хоча б 1 число")
            .integer("Має бути цілим числом")
            .nullable()
            .required("Це поле обов'язкове"),
        })
        .required("Це поле обов'язкове"),
    })
    .required("Це поле обов'язкове"),
});

export const updateCategorySchema = yup.object({
  title: yup.string(),
  parent: yup.string(),
  icon: yup.string(),
});

export const createCategorySchema = yup.object({
  title: yup.string().required("Це поле обов'язкове"),
  parent: yup.string().optional(),
  icon: yup.string().optional(),
});

export const updateRole = yup.object({
  roles: yup
    .array()
    .of(
      yup
        .mixed<UserRole>()
        .oneOf(Object.values(UserRole))
        .required("Це поле обов'язкове")
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .matches(emailRegex, "Некоректний email")
    .required("Email is required"),
});
