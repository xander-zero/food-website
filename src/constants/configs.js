export const APP_REQUEST_URL = "http://localhost:3000/api";
export const IS_SERVER = typeof window === "undefined";
export const PAGINATION_SIZE = +process.env.NEXT_PUBLIC_PAGINATION_SIZE || 10;
