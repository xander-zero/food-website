import { PAGINATION_SIZE } from "src/constants/configs";

export const antTablePaginationConfig = (current, pageSize, total) => ({
  position: ["topRight", "bottomRight"],
  showTotal: (t) => <div className="opacity-40">Total: {t}</div>,
  showSizeChanger: true,
  defaultPageSize: PAGINATION_SIZE,
  pageSizeOptions: [10, 20, 50, 100, 1000],
  hideOnSinglePage: false,
  showQuickJumper: total / pageSize > 7,
  size: "default",
  current,
  pageSize,
  total,
});

export const antTableConfig = ({ current, pageSize, total }) => ({
  bordered: true,
  tableLayout: "auto",
  scroll: { x: 1 },
  className: "overflow-auto flex-1 w-px",
  size: "middle",
  pagination:
    (total ?? 0) > PAGINATION_SIZE &&
    antTablePaginationConfig(current, pageSize, total),
});
