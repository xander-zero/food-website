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
import {
  queryFetchUsers,
  queryAddUser,
  queryDeleteUser,
  queryUpdateUser,
} from "src/service/panel/user-endpoints";

import { AddUserModal } from "./AddUserModal";

const { confirm } = Modal;

export function UserTable() {
  const [isVisibleUserModal, setIsVisibleUserModal] = useState(false);
  const [form, setForm] = useState(null);

  const userRef = useRef();

  const { getColumnSearchProps, rowClassName } = useTableSearchColumn();

  const {
    data: usersData,
    isLoading: loadingFetchUser,
    isFetching: fetchingUser,
  } = useQuery(queryFetchUsers());

  const { mutate: onAddUser, isLoading: loadingAddUser } = useMutation(
    queryAddUser()
  );

  const { mutate: onUpdateUser, isLoading: loadingUpdateUser } = useMutation(
    queryUpdateUser()
  );

  const { mutate: onDeleteUser, isLoading: loadingDeleteUser } = useMutation(
    queryDeleteUser()
  );

  const onOpenAddUserModal = () => setIsVisibleUserModal(true);

  const onOpenEditUserModal = (record) => {
    userRef.current = record;
    setIsVisibleUserModal(true);
  };

  const onCloseUserModal = () => {
    setIsVisibleUserModal(false);
    userRef.current = null;
  };

  const handleAddUser = () => {
    if (userRef.current?.firstName) {
      form.validateFields().then((values) => {
        const data = { data: values };
        onUpdateUser(
          { data, userId: userRef.current?._id },
          {
            onSuccess: () => setIsVisibleUserModal(false),
          }
        );
      });
    } else {
      form.validateFields().then((values) => {
        onAddUser(
          { data: values },
          {
            onSuccess: () => setIsVisibleUserModal(false),
          }
        );
      });
    }
  };

  const handleDeleteUser = (record) => {
    confirm({
      title: (
        <>{`Do you Want to delete ${record.firstName} ${record.lastName}?`}</>
      ),
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        onDeleteUser(record._id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = useMemo(() => {
    const col = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        ...getColumnSearchProps("firstName"),
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        ...getColumnSearchProps("lastName"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...getColumnSearchProps("email"),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Role",
        key: "role",
        render: (_, record) => (
          <>
            {record.isAdmin ? (
              <Tag color="green">Admin</Tag>
            ) : (
              <Tag color="blue">User</Tag>
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
                onClick={() => onOpenEditUserModal(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                className="rounded-full"
                icon={<DeleteOutlined className="text-red-500" />}
                onClick={() => handleDeleteUser(record)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ];
    return col;
  }, []);

  const isLoading =
    loadingAddUser ||
    loadingFetchUser ||
    loadingDeleteUser ||
    loadingUpdateUser ||
    fetchingUser;

  return (
    <PageHeaderWrapper
      title="Users"
      icon={<UserOutlined />}
      extra={
        <Button
          type="primary"
          className="bg-[#1890ff] text-white"
          onClick={onOpenAddUserModal}
        >
          Add User
        </Button>
      }
    >
      <CustomTable
        // pagination={pagination}
        bordered
        // onChange={handleChangeTable}
        dataSource={usersData?.data}
        columns={columns}
        loading={isLoading}
        rowKey={(item) => item._id}
        rowClassName={rowClassName}
      />
      <CustomModal
        visible={isVisibleUserModal}
        close={() => onCloseUserModal()}
        onOk={handleAddUser}
        children={
          <AddUserModal
            userData={userRef.current}
            setForm={setForm}
            form={form}
          />
        }
      />
    </PageHeaderWrapper>
  );
}
