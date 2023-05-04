/** @format */

import React from "react";
import { Card, Statistic } from "antd";
import CountUp from "react-countup";

const FORMATTER = (number) => (
  <CountUp duration={0.75} end={number} start={0} separator=',' suffix='%' />
);

export default function Tooltip({ x, y, value, title, width, height }) {
  const tooltipStyle = {
    top: `${y}px`,
    left: `${x}px`,
    position: "absolute",
  };
  // <g transform={`translate(${x}, ${y})`}>
  //   <text style={{ textAnchor: "start", fontSize: height * 0.2 }}>
  //     {data ? data.internetUsersPercentage : ""}
  //   </text>
  // </g>
  return value !== undefined ? (
    <div style={tooltipStyle}>
      <Card
        title={title.cardTitle}
        style={{ width, height, fontSize: `${width * 0.1}px` }}
        size='small'
      >
        <Statistic title={title.statsTitle} value={value} formatter={FORMATTER}></Statistic>
      </Card>
    </div>
  ) : (
    ""
  );
}
