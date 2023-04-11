/** @format */

import React from "react";
import { Layout, Menu } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";

// region CONSTANTS

const { Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(2).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

// endregion CONSTANTS

export default function Sidebar() {
  return (
    <Sider
      width={200}
      breakpoint='lg'
      collapsedWidth={40}
      style={{
        background: "#ffffff",
      }}
    >
      <Menu
        mode='inline'
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items2}
      />
    </Sider>
  );
}
