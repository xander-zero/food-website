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

export const queryDeleteUser = ({ ...config } = {}) => ({
  mutationFn: (userId) =>
    rqMutate({
      queryKeys: [["/user"]],
      method: "delete",
      url: `/user/${userId}`,
    }),
  mutationKey: ["/user"],
  ...config,
});

export const queryUpdateUser = ({ ...config } = {}) => ({
  mutationFn: ({ data, userId }) =>
    rqMutate({
      queryKeys: [["/user"]],
      method: "put",
      url: `/user/${userId}`,
      data,
    }),
  mutationKey: ["/user"],
  ...config,
});
