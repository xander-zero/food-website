import { Table } from "antd";
import { antTableConfig } from "src/libs/ant-table";
import clsx from "clsx";

export default function CustomTable({
  pagination = {},
  wrapperClassName,
  ...props
}) {
  return (
    <div className={clsx("flex", wrapperClassName)}>
      <Table {...antTableConfig(pagination)} {...props} />
    </div>
  );
}
