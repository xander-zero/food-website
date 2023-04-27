import { useMemo, useRef, useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Space, Tag, Tooltip } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomTable from "src/components/CustomTable";
import useTableSearchColumn from "src/utils/hooks/useTableSearchColumn";
import { PageHeaderWrapper } from "src/components/PageHeaderWrapper";
import { CustomModal } from "src/components/CustomModal";

import { queryFetchProducts } from "src/service/panel/product-endpoints";
import { AddProductModal } from "../components/AddProductModal";

export function ProductTable() {
  const [form, setForm] = useState(null);
  const [isVisibleProductModal, setIsVisibleProductModal] = useState(false);

  const { getColumnSearchProps, rowClassName } = useTableSearchColumn();

  const productRef = useRef();

  const { data: productData, isLoading: loadingFetchProducts } = useQuery(
    queryFetchProducts()
  );

  const handleAddProduct = () => {};

  const onOpenProductModal = () => {
    setIsVisibleProductModal(true);
  };

  const onCloseProductModal = () => {
    setIsVisibleProductModal(false);
  };

  const onEditProductModal = (record) => {
    setIsVisibleProductModal(true);
    productRef.current = record;
  };

  const columns = useMemo(() => {
    const col = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        ...getColumnSearchProps("title"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        ...getColumnSearchProps("price"),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Stock",
        key: "stock",
        render: (_, record) => (
          <>
            {record.isStock ? (
              <Tag color="green">stock</Tag>
            ) : (
              <Tag color="blue">InStock</Tag>
            )}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                className="rounded-full"
                icon={<EditOutlined className="text-blue-500" />}
                onClick={() => onEditProductModal(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                className="rounded-full"
                icon={<DeleteOutlined className="text-red-500" />}
                // onClick={() => handleDeleteUser(record)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ];
    return col;
  }, []);

  const isLoading = loadingFetchProducts;

  return (
    <PageHeaderWrapper
      title="Products"
      icon={<UserOutlined />}
      extra={
        <Button
          type="primary"
          className="bg-[#1890ff] text-white"
          onClick={onOpenProductModal}
        >
          Add Product
        </Button>
      }
    >
      <CustomTable
        // pagination={pagination}
        bordered
        // onChange={handleChangeTable}
        dataSource={productData?.data}
        columns={columns}
        loading={isLoading}
        rowKey={(item) => item._id}
        rowClassName={rowClassName}
      />
      <CustomModal
        visible={isVisibleProductModal}
        close={() => onCloseProductModal()}
        onOk={handleAddProduct}
        children={
          <AddProductModal
            form={form}
            setForm={setForm}
            productData={productRef.current}
          />
        }
      />
    </PageHeaderWrapper>
  );
}
