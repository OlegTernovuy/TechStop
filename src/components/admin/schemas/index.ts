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
