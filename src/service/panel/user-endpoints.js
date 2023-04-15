import { rqMutate } from "src/libs/react-query";

export const queryFetchUsers = ({ params = {}, ...config } = {}) => ({
  queryKey: ["/user", params],
  ...config,
});

export const queryAddUser = ({ ...config } = {}) => ({
  mutationFn: (data) =>
    rqMutate({
      queryKeys: [["/user"]],
      method: "post",
      url: "/user",
      data,
    }),
  mutationKey: ["/user"],
  ...config,
});
