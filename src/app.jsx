/** @format */

import { Layout } from "antd";
import routeConfig from "./route";
import fetchCsv from "./common/csv";
import Footer from "./components/Footer";
import fetchGeoData from "./common/geodata";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, createContext, useLayoutEffect, useMemo } from "react";

// #region CONSTANTS
const THEME = "light";
const { Content } = Layout;
const CSV_URL = "/data/result.csv";
const TOPOJSON_URL = "/data/worldmap.json";
const LAYOUT_HEIGHT = {
  header: 0.075,
  footer: 0.05,
  sidebar: 0.875,
};
export const WINDOW_CONTEXT = createContext();
// #endregion CONSTANTS

export default function App() {
  // #region data
  const { csvData, csvDataPending } = fetchCsv(CSV_URL);
  const { geoData, fetchGeoDataPending } = fetchGeoData(TOPOJSON_URL);
  // #endregion data

  // #region states & memos
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [selectedPage, setSelectedPage] = useState(routeConfig[0].pageName);
  const pagePathMap = useMemo(() =>
    routeConfig.reduce((prev, route) => {
      prev[route.pageName] = route.path;
      return prev;
    }, {}),
  );
  // #endregion states & memos

  // #region effects
  // * layoutEffect to update windowSize when resize happens
  useLayoutEffect(() => {
    function updateWIndowSize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    updateWIndowSize();
    window.addEventListener("resize", updateWIndowSize);
    return () => window.removeEventListener("resize", updateWIndowSize);
  }, []);
  // #endregion effects

  // #region component props
  const routedComponentProps = {
    csvData,
    geoData,
    windowWidth,
    windowHeight,
    csvDataPending,
    fetchGeoDataPending,
  };
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
  // #endregion component props

  return (
    <>
      <WINDOW_CONTEXT.Provider value={{ windowWidth, windowHeight }}>
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
                  {routeConfig.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.component(routedComponentProps)}
                    />
                  ))}
                </Routes>
              </Content>
            </Layout>
            <Footer {...footerProps} />
          </Layout>
        </Router>
      </WINDOW_CONTEXT.Provider>
    </>
  );
}
