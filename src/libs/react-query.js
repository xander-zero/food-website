import { QueryClient } from "@tanstack/react-query";
import { request } from "src/libs/request";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: rqFetch,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 20000,
      networkMode: "online",
      retry: 3,
    },
    mutations: {},
  },
});

export function rqFetch({ queryKey, signal, meta }) {
  return request({
    url: queryKey[0],
    signal,
    params: queryKey[1] || {},
    ...meta,
  }).then((res) => res.data);
}

export async function rqMutate({ queryKeys = [], ...config }) {
  await Promise.all(queryKeys.map((key) => queryClient.cancelQueries(key)));
  const { data } = await request({ ...config });
  queryKeys.forEach((key) => queryClient.invalidateQueries(key));
  return Promise.resolve(data);
}
