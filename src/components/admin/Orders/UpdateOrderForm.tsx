"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UpdatePurchasesData } from "../types/index"; // Adjust the import path according to your project structure
import { updateOrderSchema } from "../schemas";

import toast from "react-hot-toast";
import { filteredEmptyNestedFields, isObjectFilled } from "../utils";
import { updateOrderById } from "@/api/admin";
import FormField from "./OrdersForm/FormField";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { adminToastMessages } from "../constants/adminToastMessages";
import Button from "@/components/ProductCard/Button";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

const defaultValues = {
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

interface IUpdateOrderFormProps {
  currentOrderCode: string | null;
}

const { UPDATE_ORDER_ERROR, UPDATE_ORDER_SUCCESS } = adminToastMessages();

const UpdateOrderForm: FC<IUpdateOrderFormProps> = ({ currentOrderCode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateOrderSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit: SubmitHandler<UpdatePurchasesData> = async (data) => {
    const hasChanges = isObjectFilled(data);

    if (!data || !hasChanges) {
      toast.error("Noting to change");
      return;
    }

    const filteredData = filteredEmptyNestedFields(data);

    try {
      setIsLoading(true);

      await updateOrderById(currentOrderCode ?? "", filteredData);

      setIsLoading(false);
      setIsError(null);
      toast.success(UPDATE_ORDER_SUCCESS);
      reset();
    } catch (error) {
      setIsLoading(false);
      setIsError(isError);
      toast.error(isError?.message ?? UPDATE_ORDER_ERROR);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center">
          {" "}
          <FormField
            name="email"
            label="Email"
            control={control}
            errors={errors}
          />
          <FormField
            name="orderStatus"
            label="Order Status"
            control={control}
            errors={errors}
          />
          <FormField
            name="customerPhone"
            label="Customer Phone"
            control={control}
            errors={errors}
          />
          <FormField
            type="number"
            name="totalPrice"
            label="Total Price"
            control={control}
            errors={errors}
          />
          <FormField
            name="paymentStatus"
            label="Payment Status"
            control={control}
            errors={errors}
          />
          <FormField
            name="paymentMethod"
            label="Payment Method"
            control={control}
            errors={errors}
          />
        </div>

        <div className="max-w-full">
          <label className="block text-gray-700">Products</label>
          <ul>
            {fields.map((item, index) => (
              <div
                key={item.productId}
                className="flex justify-center items-center"
              >
                <FormField
                  name={`products[${index}].productId`}
                  label="ProductId"
                  control={control}
                  errors={errors}
                />
                <FormField
                  name={`products[${index}].title`}
                  label="Title"
                  control={control}
                  errors={errors}
                />
                <FormField
                  name={`products[${index}].price`}
                  label="Price"
                  control={control}
                  errors={errors}
                />
                <FormField
                  name={`products[${index}].quantity`}
                  label="Quantity"
                  control={control}
                  errors={errors}
                />
                <FormField
                  name={`products[${index}].poster`}
                  label="Poster"
                  control={control}
                  errors={errors}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({
                  productId: "",
                  title: "",
                  price: 0,
                  quantity: 0,
                  poster: "",
                })
              }
              className="bg-green-500 text-white p-1 rounded"
            >
              Add Product
            </button>
          </ul>
          {errors?.products && (
            <p className="text-red-500">{errors?.products?.message}</p>
          )}
        </div>

        <div className="w-full">
          <h3 className="text-lg text-TechStopBlue font-bold">Recepient</h3>

          <div className="flex justify-center">
            {" "}
            <FormField
              name="recepient.name"
              label="Recepient Name"
              control={control}
              errors={errors}
            />
            <FormField
              name="recepient.phone"
              label="Recepient Phone"
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-lg text-TechStopBlue font-bold">
            Delivery Address
          </h3>
          <div className="flex justify-center items-center">
            {" "}
            <FormField
              name="deliveryAddress.city"
              label="City"
              control={control}
              errors={errors}
            />
            <FormField
              name="deliveryAddress.postalOperator"
              label="Postal Operator"
              control={control}
              errors={errors}
            />
            <FormField
              name="deliveryAddress.postalDepartment"
              label="Postal Department"
              control={control}
              errors={errors}
            />
            <FormField
              name="deliveryAddress.personalAddress.street"
              label="Street"
              control={control}
              errors={errors}
            />
            <FormField
              name="deliveryAddress.personalAddress.house"
              label="House"
              control={control}
              errors={errors}
            />
            <FormField
              type="number"
              name="deliveryAddress.personalAddress.apartment"
              label="Apartment"
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <div className="w-full flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Reset
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-TechStopBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? <CustomSpinner width={20} height={20} /> : "Submit"}
          </Button>
        </div>
      </form>
      <CustomToast />
    </>
  );
};

export default UpdateOrderForm;
