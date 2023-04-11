/** @format */

import React from "react";
import { Layout, Menu } from "antd";

// region CONSTANTS

const HeaderAntd = Layout.Header;

const items1 = [{ key: "header", label: "Info Visulization 2023" }];

// endregion CONSTANTS

export default function Header() {
  return (
    <HeaderAntd className='header' style={{ backgroundColor: "#ffffff" }}>
      <div className='logo' />
      <Menu mode='horizontal' items={items1} selectedKeys={"header"} />
    </HeaderAntd>
  );
}
