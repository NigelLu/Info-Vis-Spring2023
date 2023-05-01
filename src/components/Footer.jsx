/** @format */

import { WINDOW_CONTEXT } from "../app";
import React, { useContext } from "react";
import { Layout, Row, Col } from "antd";

// #region CONSTANTS
const FooterAntd = Layout.Footer;
// #endregion CONSTANTS

export default function Footer({ layoutHeight }) {
  const windowSize = useContext(WINDOW_CONTEXT);

  return (
    <FooterAntd
      style={{
        textAlign: "center",
        color: "rgba(0, 0, 0, 0.5)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        paddingTop: `${Math.floor(windowSize.windowHeight * 0.015)}px`,
        height: `${Math.floor(layoutHeight.footer * windowSize.windowHeight) + 5}px`,
        fontSize: `${Math.floor((windowSize.windowHeight * layoutHeight.footer) / 3.5)}px`,
      }}
    >
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "center",
            fontSize: `${Math.floor(windowSize.windowHeight * 0.0125)}px`,
          }}
        >
          {/* for placeholder reason ONLY */}
          <p
            style={{
              fontSize: `${Math.floor(windowSize.windowHeight * 0.006)}px`,
            }}
          ></p>
          <b>DATS-SHU 235 Final Project Group 3, Spring 2023</b> by <em>Xiaochen (Nigel) Lu</em>{" "}
          &amp; <em>Xingyu (Addison) Guo</em>
        </Col>
      </Row>
    </FooterAntd>
  );
}
