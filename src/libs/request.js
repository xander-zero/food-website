import axios from "axios";
import { message } from "antd";
import { APP_REQUEST_URL, IS_SERVER } from "src/constants/configs";

const REQUEST_TIMEOUT = 40000;
const REQUEST_HEADERS = {
  "Content-Type": "application/json",
};

export const request = axios.create({
  baseURL: APP_REQUEST_URL,
  timeout: REQUEST_TIMEOUT,
  headers: REQUEST_HEADERS,
});

// request.interceptors.request.use(async (request) => {
//   if (IS_SERVER) return request;
//   if (request.headers.Authorization) return request;

//   const token = selectUserToken(store.getState());
//   if (token) {
//     request.headers.Authorization = `Bearer ${token}`;
//   }

//   return request;
// });

let lastErrorMessage = null;
let lastErrorDate = Date.now();
request.interceptors.response.use(
  (res) => {
    if (IS_SERVER) return res;

    if (res.data?.message) {
      message.success(res.data?.message);
    }
    return res;
  },
  (err) => {
    if (IS_SERVER) throw err;

    const errorMessage =
      err.response?.data.error?.message ||
      err.response?.data.message ||
      err.response?.status;

    if (
      errorMessage &&
      (errorMessage !== lastErrorMessage || Date.now() > lastErrorDate + 3000)
    ) {
      lastErrorMessage = errorMessage;
      lastErrorDate = Date.now();
      message.error(errorMessage);
    }

    // if (err.response?.status === 401) signOut({ redirect: true });

    // throw err;
  }
);
