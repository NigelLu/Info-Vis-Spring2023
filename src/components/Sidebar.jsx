/** @format */

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useEffect } from "react";
import { NotificationOutlined } from "@ant-design/icons";

// region CONSTANTS

const { Sider } = Layout;

// endregion CONSTANTS

export default function Sidebar({ pagePathMap, selectedPage, setSelectedPage }) {
  const navigate = useNavigate();

  // region states & memos

  // * build the sidebarItems Array
  const sidebarItems = useMemo(
    () =>
      pagePathMap
        ? Object.getOwnPropertyNames(pagePathMap).map((pageName) => {
            return {
              key: pageName,
              icon: React.createElement(NotificationOutlined),
              label: pageName,
            };
          })
        : [],
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
      collapsedWidth={40}
      theme={"dark"}
      style={{
        paddingTop: 20,
        minHeight: "100vh",
      }}
    >
      <Menu
        mode='inline'
        style={{
          height: "100%",
          borderRight: 0,
        }}
        theme={"dark"}
        items={sidebarItems}
        selectedKeys={"sub1"}
        onClick={(e) => setSelectedPage(e.key)}
      />
    </Sider>
  );
}
