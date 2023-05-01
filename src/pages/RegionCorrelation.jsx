/** @format */

import React from "react";
import { Spin } from "antd";

export default function RegionCorrelation({ csvData, csvDataPending }) {
  return csvDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <h1>Region Correlation</h1>
  );
}
