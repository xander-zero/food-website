import { useMemo, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomTable from "src/components/CustomTable";
import useTableSearchColumn from "src/utils/hooks/useTableSearchColumn";

import { PageHeaderWrapper } from "src/components/PageHeaderWrapper";
import { CustomModal } from "src/components/CustomModal";
import {
  queryFetchUsers,
  queryAddUser,
} from "src/service/panel/user-endpoints";

import { AddUserModal } from "./AddUserModal";

export function UserTable() {
  const [isVisibleUserModal, setIsVisibleUserModal] = useState(false);
  const [form, setForm] = useState(null);

  const { getColumnSearchProps, rowClassName } = useTableSearchColumn();

  const { data: usersData, isLoading: loadingFetchUser } = useQuery(
    queryFetchUsers()
  );

  const { mutate: onAddUser, isLoading: loadingAddUser } = useMutation(
    queryAddUser()
  );

  const onOpenAddUserModal = () => setIsVisibleUserModal(true);

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      onAddUser(
        { data: values },
        {
          onSuccess: () => setIsVisibleUserModal(false),
        }
      );
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
            <a>Invite</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    return col;
  }, []);

  const isLoading = loadingAddUser || loadingFetchUser;

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
        close={() => setIsVisibleUserModal(false)}
        onOk={handleAddUser}
        children={<AddUserModal setForm={setForm} />}
      />
    </PageHeaderWrapper>
  );
}
