import * as yup from "yup";

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
  title: yup.string().required("Це поле є обов'язковим"),
  parent: yup.string(),
  icon: yup.string(),
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
