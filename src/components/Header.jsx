/** @format */

import React from "react";
import { Layout, Menu } from "antd";
import { RightOutlined } from "@ant-design/icons";

// region CONSTANTS

const HeaderAntd = Layout.Header;

const items1 = [
  { key: "header", label: "Info Visulization 2023", icon: React.createElement(RightOutlined) },
];

// endregion CONSTANTS

export default function Header() {
  return (
    <HeaderAntd className='header' style={{ backgroundColor: "#ffffff", marginLeft: -40 }}>
      <Menu mode='horizontal' items={items1} selectedKeys={"header"} />
    </HeaderAntd>
  );
}
