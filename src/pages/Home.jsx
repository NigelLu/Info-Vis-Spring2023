/** @format */

import React from "react";
import { Spin } from "antd";

export default function Home({ csvData, csvDataPending }) {
  return csvDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <h1>Home</h1>
  );
}
