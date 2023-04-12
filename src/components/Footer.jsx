/** @format */

import React from "react";
import { Layout, Row, Col } from "antd";

// region CONSTANTS
const FooterAntd = Layout.Footer;
// endregion CONSTANTS

export default function Footer({ layoutHeight }) {
  return (
    <FooterAntd
      style={{
        textAlign: "center",
        height: layoutHeight.footer,
        color: "rgba(0, 0, 0, 0.6)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <Row style={{ marginTop: "-2vh" }}>
        <Col span={24}>
          <span style={{ fontSize: "8px" }}>
            by <em>Xiaochen (Nigel) Lu</em> &amp; <em>Xingyu (Addison) Guo</em>
          </span>
        </Col>
      </Row>
      <Row style={{ paddingTop: "0.3rem", marginTop: "-0.75vh" }}>
        <Col span={24}>
          <span style={{ fontSize: "10px" }}>
            <b>DATS-SHU 235 Final Project Group 3, Spring 2023</b>
          </span>
        </Col>
      </Row>
    </FooterAntd>
  );
}
