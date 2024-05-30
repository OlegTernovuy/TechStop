import axios from "axios";

const BASE_STRAPI_API_URL = "http://localhost:1337";

export const addProduct = async (data) => {
  try {
    console.log(data);
    const resp = await axios.post(`${BASE_STRAPI_API_URL}/api/testproduct`, {
      data,
    });

    return resp.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProductById = async (_id: string, data) => {
  try {
    console.log(_id);
    const resp = await axios.patch(
      `${BASE_STRAPI_API_URL}/api/testproducts/${_id}`,
      {
        data,
      }
    );

    return resp.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllProducts = async () => {
  try {
    const resp = await axios.get(`${BASE_STRAPI_API_URL}/api/testproducts`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProductById = async (_id: string) => {
  try {
    const resp = await axios.delete(
      `${BASE_STRAPI_API_URL}/api/testproducts/${_id}`
    );
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error.message);
  }
};
