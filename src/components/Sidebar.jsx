/** @format */

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";

// region CONSTANTS

const { Sider } = Layout;

// endregion CONSTANTS

export default function Sidebar({
  theme,
  pagePathMap,
  selectedPage,
  setSelectedPage,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const navigate = useNavigate();

  // region states & memos

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

  // endregion states & memos

  // region effects

  // * navigate to the page while selected page changes
  useEffect(() => {
    navigate(pagePathMap[selectedPage]);
  }, [selectedPage]);
  // endregion effects

  return (
    <Sider
      width={200}
      breakpoint='lg'
      collapsedWidth={55}
      theme={theme}
      style={{
        paddingTop: 15,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
      collapsed={sidebarCollapsed}
      onBreakpoint={(broken) => setSidebarCollapsed(broken)}
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
