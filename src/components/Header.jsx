/** @format */

import React from "react";
import { Layout, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// region CONSTANTS

const COLLAPSE_BUTTON_SPAN = 1;
const HeaderAntd = Layout.Header;

// endregion CONSTANTS

export default function Header({ theme, sidebarCollapsed, setSidebarCollapsed }) {
  return (
    <HeaderAntd
      theme={theme}
      className='header'
      style={{
        marginLeft: -40,
        background: "#ffffff",
        backgroundColor: "#ffffff",
      }}
    >
      <Row>
        <Col span={COLLAPSE_BUTTON_SPAN}>
          {React.createElement(sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setSidebarCollapsed(!sidebarCollapsed),
          })}
        </Col>
        <Col span={24 - COLLAPSE_BUTTON_SPAN}>
          <Row>
            <Col span={8}>
              <p style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.6)", marginTop: "-0.1rem" }}>
                <b>Information Visualization 2023</b>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </HeaderAntd>
  );
}
