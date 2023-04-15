import { useMemo, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";

import CustomTable from "src/components/CustomTable";
import useTableSearchColumn from "src/utils/hooks/useTableSearchColumn";

import { PageHeaderWrapper } from "src/components/PageHeaderWrapper";
import { CustomModal } from "src/components/CustomModal";
import { queryFetchUsers } from "src/service/panel/user-endpoints";

import { AddUserModal } from "./AddUserModal";

export function UserTable() {
  const [isVisibleUserModal, setIsVisibleUserModal] = useState(false);

  const onOpenAddUserModal = () => setIsVisibleUserModal(true);

  const { data: usersData, isLoading } = useQuery(queryFetchUsers());

  const { getColumnSearchProps, rowClassName } = useTableSearchColumn();

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
        children={<AddUserModal />}
      />
    </PageHeaderWrapper>
  );
}
