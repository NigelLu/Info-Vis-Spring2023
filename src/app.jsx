/** @format */

import { Layout } from "antd";
import routeConfig from "./route";
import fetchCsv from "./common/csv";
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// region CONSTANTS

const THEME = "light";
const { Content } = Layout;
const CSV_URL = "/data/Final.csv";

// endregion CONSTANTS

export default function App() {
  const { csvData, csvDataPending } = fetchCsv(CSV_URL);

  // region states & memos
  const pagePathMap = {};
  routeConfig.forEach((route) => (pagePathMap[route.pageName] = route.path));

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState(routeConfig[0].pageName);
  // endregion states & memos

  // region component props
  const routedComponentProps = { csvData, csvDataPending };
  const headerProps = { theme: THEME, sidebarCollapsed, setSidebarCollapsed };
  const sidebarProps = {
    theme: THEME,
    pagePathMap,
    selectedPage,
    setSelectedPage,
    sidebarCollapsed,
    setSidebarCollapsed,
  };
  // endregion component props

  return (
    <>
      <Router>
        <Layout style={{ fontFamily: "sans-serif" }}>
          <Sidebar {...sidebarProps} />
          <Layout>
            <Header {...headerProps} />
            <Content
              style={{
                margin: 0,
                padding: 0,
                minHeight: 280,
                paddingLeft: 50,
                textAlign: "center",
                background: "#ffffff",
              }}
            >
              <Routes>
                {routeConfig.map((route, i) => (
                  <Route
                    path={route.path}
                    key={i}
                    element={route.component(routedComponentProps)}
                  />
                ))}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
}
