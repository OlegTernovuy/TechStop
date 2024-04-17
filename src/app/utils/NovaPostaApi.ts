import axios from "axios";

export const novaPoshtaApi = axios.create({
  baseURL: "https://api.novaposhta.ua/v2.0/json/",
});

export const getData = async (city: string) => {
  try {
    const { data, status } = await novaPoshtaApi.post(``, {
        "apiKey": "17793f6f9a6f74beb7350b7129c0b5ca",
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": city,
            "Limit": "20",
            "Page": "1"
        }
    }
    );    
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getNovaPostDepartments = async (DeliveryCity: string) => {
  try {
    const { data, status } = await novaPoshtaApi.post(``, {
        "apiKey": "17793f6f9a6f74beb7350b7129c0b5ca",
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityRef": DeliveryCity,
            "TypeOfWarehouseRef": '841339c7-591a-42e2-8233-7a0a00f0ed6f',
        }
    }
    );    
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data;
  } catch (error) {
    return error;
  }
};
