/** @format */

import React from "react";
import { Spin } from "antd";

export default function CountryTrend({ csvData, csvDataPending }) {
  return csvDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <h1>Country Trend</h1>
  );
}
