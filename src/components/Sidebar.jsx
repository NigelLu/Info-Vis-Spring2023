/** @format */

import { Layout, Menu } from "antd";
import { WINDOW_CONTEXT } from "../app";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import React, { useMemo, useEffect, useContext } from "react";

// #region CONSTANTS

const { Sider } = Layout;

// #endregion CONSTANTS

export default function Sidebar({
  theme,
  pagePathMap,
  layoutHeight,
  selectedPage,
  setSelectedPage,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const navigate = useNavigate();
  const windowSize = useContext(WINDOW_CONTEXT);

  // #region states & memos

  // * build the sidebarItems Array
  const sidebarItems = useMemo(
    () =>
      pagePathMap
        ? [
            {
              key: "root",
              label: "Views",
              type: "group",
              children: Object.getOwnPropertyNames(pagePathMap).map((pageName) => {
                return {
                  key: pageName,
                  icon: React.createElement(RightOutlined),
                  label: pageName,
                };
              }),
            },
          ]
        : [{ key: "root", label: "Views", type: "group", children: [] }],
    [pagePathMap, selectedPage, setSelectedPage],
  );

  // #endregion states & memos

  // #region effects

  // * navigate to the page while selected page changes
  useEffect(() => {
    navigate(pagePathMap[selectedPage]);
  }, [selectedPage]);
  // #endregion effects

  return (
    <Sider
      breakpoint='lg'
      theme={theme}
      collapsed={sidebarCollapsed}
      width={Math.floor(windowSize.windowWidth * 0.15)}
      onBreakpoint={(broken) => setSidebarCollapsed(broken)}
      collapsedWidth={Math.max(Math.floor(windowSize.windowWidth * 0.05), 55)}
      style={{
        height: `${Math.floor(layoutHeight.sidebar * windowSize.windowHeight)}px`,
      }}
    >
      <Menu
        mode='inline'
        style={{
          height: "100%",
          borderRight: 0,
        }}
        theme={theme}
        items={sidebarItems}
        selectedKeys={selectedPage}
        onClick={(e) => setSelectedPage(e.key)}
      />
    </Sider>
  );
}
