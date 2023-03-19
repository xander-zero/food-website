import { API } from "../request";

export const fetchProducts = () => API.get("/data");
