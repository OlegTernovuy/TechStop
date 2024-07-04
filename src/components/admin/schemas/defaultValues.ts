export const defaultValues = {
  email: "",
  orderStatus: "",
  customerPhone: "",
  totalPrice: Number(0),
  paymentStatus: "",
  paymentMethod: "",
  products: [
    {
      productId: "",
      title: "",
      price: 0,
      quantity: 0,
      poster: "",
    },
  ],
  recepient: {
    name: "",
    phone: "",
  },
  deliveryAddress: {
    city: "",
    postalOperator: "",
    postalDepartment: "",
    personalAddress: {
      street: "",
      house: "",
      apartment: Number(0),
    },
  },
};
