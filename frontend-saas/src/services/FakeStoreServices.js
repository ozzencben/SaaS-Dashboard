import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = async () => {
  try {
    const res = await fakeStoreApi.get("/products");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fakeStoreApi.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCategories = async () => {
  try {
    const res = await fakeStoreApi.get("/products/categories");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => {
  try {
    const res = await fakeStoreApi.get("/users");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCarts = async () => {
  try {
    const res = await fakeStoreApi.get("/carts");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
