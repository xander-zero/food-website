import React, { useState } from "react";
import Link from "next/link";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, Tag } from "antd";

const { Header, Sider, Content } = Layout;

export function PanelLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-[100vh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={250}
      >
        <div className="logo w-[100%] h-16 flex items-center p-4 text-xl">
          <Avatar size="large">MA</Avatar>
          {!collapsed && (
            <div className="flex flex-col mx-2">
              <p className="text-sm">Mahmoud Ansari</p>
              <p className="text-xs">
                <Tag color="green">SuperAdmin</Tag>
              </p>
            </div>
          )}
        </div>
        <Menu
          className="h-[100vh]"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link href="/panel/user">User</Link>,
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: <Link href="/panel/products">Products</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="bg-white"
          style={{
            padding: 0,
          }}
        >
          <div className="ml-4">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger text-lg",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
        </Header>
        <Content className="site-layout-background">{children}</Content>
      </Layout>
    </Layout>
  );
}
