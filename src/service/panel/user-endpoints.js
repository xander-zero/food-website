export const queryFetchUsers = ({ params = {}, ...config } = {}) => ({
  queryKey: ["/user", params],
  ...config,
});
