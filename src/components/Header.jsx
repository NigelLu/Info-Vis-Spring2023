/** @format */

import React, { useContext } from "react";
import { Layout, Row, Col } from "antd";
import { WINDOW_CONTEXT } from "../app";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// #region CONSTANTS

const COLLAPSE_BUTTON_SPAN = 1;
const HeaderAntd = Layout.Header;

// #endregion CONSTANTS

export default function Header({ theme, layoutHeight, sidebarCollapsed, setSidebarCollapsed }) {
  const windowSize = useContext(WINDOW_CONTEXT);
  return (
    <HeaderAntd
      theme={theme}
      style={{
        width: "100%",
        background: "#ffffff",
        backgroundColor: "#ffffff",
        height: `${Math.floor(layoutHeight.header * windowSize.windowHeight)}px`,
      }}
    >
      {React.createElement(sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setSidebarCollapsed(!sidebarCollapsed),
        style: { marginLeft: `-${Math.floor(windowSize.windowWidth * 0.02)}px` },
      })}
      <span
        style={{
          color: "rgba(0, 0, 0, 0.75)",
          marginLeft: `${Math.floor(windowSize.windowWidth * 0.035)}px`,
          fontSize: `${Math.floor((windowSize.windowHeight * layoutHeight.header) / 3)}px`,
        }}
      >
        <b>Information Visualization 2023</b>
      </span>
      {/* <Row>
        <Col span={COLLAPSE_BUTTON_SPAN}></Col>
        <Col span={24 - COLLAPSE_BUTTON_SPAN}>
          <Row>
            <Col span={8}></Col>
          </Row>
        </Col>
      </Row> */}
    </HeaderAntd>
  );
}
