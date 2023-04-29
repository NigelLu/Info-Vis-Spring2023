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
        fontSize: "0.75rem",
        textAlign: "center",
        paddingTop: "1.8vh",
        height: layoutHeight.footer,
        color: "rgba(0, 0, 0, 0.6)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      DATS-SHU 235 Final Project Group 3, Spring 2023 by Xiaochen (Nigel) Lu &amp; Xingyu (Addison)
      Guo
      {/* <div style={{ fontSize: "1vh", top: "-1vh" }}>
        <b>DATS-SHU 235 Final Project Group 3, Spring 2023</b> by <em>Xiaochen (Nigel) Lu</em> &amp;{" "}
        <em>Xingyu (Addison) Guo</em>
      </div> */}
      {/* <Row style={{ position: "absolute", top: `95.5vh`, left: "45vw" }}>
        <Col span={24}>
          <span style={{ fontSize: "0.75vh" }}>
            by <em>Xiaochen (Nigel) Lu</em> &amp; <em>Xingyu (Addison) Guo</em>
          </span>
          <span style={{ fontSize: "1vh" }}>
            <b>DATS-SHU 235 Final Project Group 3, Spring 2023</b>
          </span>
        </Col>
      </Row> */}
    </FooterAntd>
  );
}
