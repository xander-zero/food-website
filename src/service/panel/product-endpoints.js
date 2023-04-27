import { rqMutate } from "src/libs/react-query";

export const queryFetchProducts = ({ params = {}, ...config } = {}) => ({
  queryKey: ["/product", params],
  ...config,
});
