/** @format */

import { Layout } from "antd";
import routeConfig from "./route";
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// region CONSTANTS

const { Content } = Layout;

// endregion CONSTANTS

export default function App() {
  // region states & memos
  const pagePathMap = {};
  routeConfig.forEach((route) => (pagePathMap[route.pageName] = route.path));

  const [selectedPage, setSelectedPage] = useState(routeConfig[0].pageName);
  // endregion states & memos

  const sidebarProps = { pagePathMap, selectedPage, setSelectedPage };
  return (
    <>
      <Layout>
        <Router>
          <Sidebar {...sidebarProps} />
          <Layout>
            <Header />
            <Content
              style={{
                margin: 0,
                padding: 24,
                minHeight: 280,
                paddingLeft: 50,
                background: "#ffffff",
              }}
            >
              <Routes>
                {routeConfig.map((route, i) => (
                  <Route path={route.path} key={i} element={route.component()} />
                ))}
              </Routes>
            </Content>
          </Layout>
        </Router>
      </Layout>
    </>
  );
}
