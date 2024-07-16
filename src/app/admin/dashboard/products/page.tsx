"use client";

import { useEffect, useState } from "react";
import { getCategories, getProductsByQuery } from "@/api";
import { createProduct, deleteById } from "@/api/admin";
import toast from "react-hot-toast";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Checkbox, Pagination } from "@mui/material";

import { Categories, Product } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateProductData } from "@/components/admin/types";
import { createProductSchema } from "@/components/admin/schemas";

import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import AdminTHList from "@/components/admin/AdminTHList";
import CharacteristicsFields from "@/components/admin/CharacteristicsFields";
import ProductsList from "@/components/admin/Products/ProductsList";
import withAuth from "@/components/hoc/withAuth";
import { useSession } from "next-auth/react";
import { pageCount } from "@/app/utils/pageCount";
import CustomSelect from "@/components/admin/Categories/CustomSelect";

const defaultValues = {
  title: "",
  price: Number(0),
  categories: [],
  characteristics: [{ name: "", description: [""] }],
  inStock: false,
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState<number | undefined>(1);
  const [categories, setCategories] = useState<Categories[] | undefined>([]);

  const { data } = useSession();

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
      const productsList = await getProductsByQuery({
        page,
      });

      setProducts(productsList?.products || []);
      setIsLoading(false);
      setTotalProducts(productsList?.total);
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const { fields: characteristicFields, append: appendCharacteristic } =
    useFieldArray({
      control,
      name: "characteristics",
    });

  const isUser = data?.user?.roles?.find((item) => item === "user");

  const onSubmit: SubmitHandler<ICreateProductData> = async (data) => {
    if (isUser) {
      toast.error("You don`t have access to create products");
      return;
    }

    data.price = Number(data.price);

    try {
      if (!data) {
        return;
      }

      const createdProduct = await createProduct(data);

      setProducts((prevProducts) => [...prevProducts, createdProduct]);

      toast.success("Product created successfully");
      toggleModal();

      reset();
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  const handleDelete = async (_id: string) => {
    if (isUser) {
      toast.error("You don`t have access to delete products");
      return;
    }

    try {
      await deleteById(_id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== _id)
      );
      toast.success(`Products with ID ${_id} was deleted`);
    } catch (error) {
      toast.error(`Failed to delete product with ID ${_id}`);
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (value === pageCount(totalProducts)) {
      toast.success("Ви дійшли до останьої сторінки");
      return;
    }
  };

  return (
    <>
      <div>
        <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Products</h1>
        <button
          type="button"
          className="text-white bg-slate-900 px-10 py-2 my-4 rounded-full hover:bg-slate-700 "
          onClick={toggleModal}
        >
          Create Product
        </button>{" "}
        <div className="overflow-auto z-1000000">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <AdminTHList />
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="text-center p-3">
                    <CustomSpinner />
                  </td>
                </tr>
              )}

              {products.length !== 0 ? (
                <ProductsList products={products} handleDelete={handleDelete} />
              ) : (
                "Products list is empty"
              )}
            </tbody>
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

              <div className="w-full mb-4">
                <label htmlFor="categories" className="block text-gray-700">
                  Categories
                </label>
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={
                        (categories &&
                          categories?.map((option) => option.slug)) ||
                        []
                      }
                      error={errors.categories?.message}
                    />
                  )}
                />
                {errors.categories && (
                  <p className="text-red-500">{errors.categories.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Characteristics</label>
                <CharacteristicsFields
                  characteristicFields={characteristicFields}
                  control={control}
                />
                <button
                  type="button"
                  onClick={() =>
                    appendCharacteristic({ name: "", description: [""] })
                  }
                  className="text-blue-500 hover:text-blue-700 mt-2"
                >
                  Add Characteristic
                </button>
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
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </FormProvider>
        </Modal>
      )}
      <CustomToast />

      {products.length !== 0 && (
        <div className="flex justify-center my-8">
          <Pagination
            count={pageCount(totalProducts)}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default withAuth(ProductsPage);
