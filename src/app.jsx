/** @format */

import { Layout } from "antd";
import routeConfig from "./route";
import fetchCsv from "./common/csv";
import React, { useState } from "react";
import Footer from "./components/Footer";
import fetchGeoData from "./common/geodata";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// region CONSTANTS
const { Content } = Layout;

const THEME = "light";
const CSV_URL = "/data/result.csv";
const TOPOJSON_URL = "/data/worldmap.json";
const LAYOUT_HEIGHT = {
  header: "5vh",
  footer: "5vh",
  sidebar: "90vh",
};

// endregion CONSTANTS

export default function App() {
  const { csvData, csvDataPending } = fetchCsv(CSV_URL);
  const { geoData, fetchGeoDataPending } = fetchGeoData(TOPOJSON_URL);

  // region states & memos
  const pagePathMap = {};
  routeConfig.forEach((route) => (pagePathMap[route.pageName] = route.path));

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState(routeConfig[0].pageName);
  // endregion states & memos

  // region component props
  const routedComponentProps = { csvData, csvDataPending, geoData, fetchGeoDataPending };
  const headerProps = {
    theme: THEME,
    sidebarCollapsed,
    setSidebarCollapsed,
    layoutHeight: LAYOUT_HEIGHT,
  };
  const sidebarProps = {
    theme: THEME,
    pagePathMap,
    selectedPage,
    setSelectedPage,
    sidebarCollapsed,
    setSidebarCollapsed,
    layoutHeight: LAYOUT_HEIGHT,
  };
  const footerProps = {
    layoutHeight: LAYOUT_HEIGHT,
  };
  // endregion component props

  return (
    <>
      <Router>
        <Layout style={{ fontFamily: "sans-serif" }}>
          <Header {...headerProps} />
          <Layout hasSider>
            <Sidebar {...sidebarProps} />
            <Content
              style={{
                margin: 0,
                padding: 0,
                minHeight: 280,
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
          <Footer {...footerProps} />
        </Layout>
      </Router>
    </>
  );
}
