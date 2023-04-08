import { rqMutate } from "src/libs/react-query";

// export const queryFetchAuthenticators = ({ params = {}, ...config } = {}) => ({
//     queryKey: ['/authenticators', params],
//     ...config,
//   });

export const queryRegister = ({ ...config } = {}) => ({
  mutationFn: (data) =>
    rqMutate({
      queryKeys: [["/register"]],
      method: "post",
      url: "/register",
      data,
    }),
  mutationKey: ["/register"],
  ...config,
});
