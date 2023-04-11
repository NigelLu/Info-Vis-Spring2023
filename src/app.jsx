/** @format */

import React from "react";
import { Layout } from "antd";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

// region CONSTANTS

const { Content } = Layout;

// endregion CONSTANTS

export default function App() {
  return (
    <>
      <Layout>
        <Sidebar />
        <Layout>
          <Header />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#ffffff",
            }}
          ></Content>
        </Layout>
      </Layout>
    </>
  );
}
