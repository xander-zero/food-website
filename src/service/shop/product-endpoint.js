import { API } from "../request";

export const fetchProducts = () => API.get("/data");

export const fetchProductDetail = (productId) => API.get(`/data/${productId}`);
