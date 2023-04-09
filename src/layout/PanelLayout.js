import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, Tag } from "antd";
import React, { useState } from "react";
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
              label: "User",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
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
