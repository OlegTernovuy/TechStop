"use client";

import { useEffect, useState } from "react";
import { getProductsData } from "@/api";
import { createProduct, deleteById } from "@/api/admin";
import toast from "react-hot-toast";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Checkbox } from "@mui/material";

import { Product } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateProductData } from "@/components/admin/types";
import { createProductSchema } from "@/components/admin/schemas";

import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import AdminTHList from "@/components/admin/AdminTHList";
import CharacteristicsFields from "@/components/admin/CharacteristicsFields";
import FieldArray from "@/components/admin/FieldArray";
import ProductsList from "@/components/admin/Products/ProductsList";
import Button from "@/components/ProductCard/Button";
import { adminToastMessages } from "@/components/admin/constants/adminToastMessages";

const defaultValues = {
  title: "",
  price: 0,
  categories: [""],
  characteristics: [{ name: "", description: [""] }],
  inStock: false,
};
const { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_SUCCESS } = adminToastMessages();

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(createProductSchema),
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const productsList = await getProductsData();
      localStorage.setItem("AdminProducts", JSON.stringify(productsList));
      setIsLoading(false);
      const get = localStorage.getItem("AdminProducts");
      console.log(JSON.parse(get ?? ""));
      setProducts(productsList ?? []);
    };
    fetchProducts();
  }, []);

  const { fields: characteristicFields, append: appendCharacteristic } =
    useFieldArray({
      control,
      name: "characteristics",
    });

  const onSubmit: SubmitHandler<ICreateProductData> = async (data) => {
    try {
      if (!data) {
        return;
      }

      const createdProduct = await createProduct(data);

      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      toast.success(CREATE_PRODUCT_SUCCESS);
      toggleModal();
      reset();
    } catch (error) {
      toast.error(CREATE_PRODUCT_ERROR);
    }
  };

  const handleDelete = async (_id: string) => {
    const { DELETE_PRODUCT_ERROR, DELETE_PRODUCT_SUCCESS } =
      adminToastMessages(_id);
    try {
      await deleteById(_id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== _id)
      );
      toast.success(DELETE_PRODUCT_SUCCESS);
    } catch (error) {
      toast.error(DELETE_PRODUCT_ERROR);
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  if (!products) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Products</h1>
        <Button
          type="button"
          className="text-white bg-slate-900 px-10 py-2 my-4 rounded-full hover:bg-slate-700 "
          onClick={toggleModal}
        >
          Create Product
        </Button>{" "}
        <div className="overflow-auto z-1000000">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <AdminTHList />
            </thead>
            {isLoading ? (
              <CustomSpinner />
            ) : (
              <tbody>
                <ProductsList products={products} handleDelete={handleDelete} />
              </tbody>
            )}
          </table>
        </div>
        <CustomToast />
      </div>
      {modalIsOpen && (
        <Modal onClose={toggleModal} maxheight="972" maxwidth="600">
          <h2 className="text-2xl text-TechStopBlue font-bold mb-4">
            Create Product
          </h2>
          <FormProvider {...methods}>
            {" "}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <CustomInput label="Title" name="title" />
              </div>
              <div className="mb-4">
                <CustomInput label="Price" name="price" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Categories</label>
                <FieldArray
                  control={control}
                  name="categories"
                  labelPrefix="Category"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Characteristics</label>
                <CharacteristicsFields
                  characteristicFields={characteristicFields}
                  control={control}
                />
                <Button
                  type="button"
                  onClick={() =>
                    appendCharacteristic({ name: "", description: [""] })
                  }
                  className="text-blue-500 hover:text-blue-700 mt-2"
                >
                  Add Characteristic
                </Button>
              </div>

              <div className="mb-4">
                <Controller
                  name="inStock"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <Checkbox {...field} className="mr-2 leading-tight" />
                      <span className="text-gray-700">In Stock</span>
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal>
      )}
    </>
  );
};

export default ProductsPage;
