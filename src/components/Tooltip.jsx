/** @format */

import React from "react";
import { Card, Statistic } from "antd";
import CountUp from "react-countup";

const FORMATTER_INTERNET = (number) => (
  <CountUp duration={0.75} end={number} start={0} separator=',' suffix='%' />
);

const FORMATTER_GDP = (number) => (
  <CountUp duration={0.75} end={number} start={0} separator=',' prefix='$ ' />
);

export default function Tooltip({ x, y, value, title, width, height }) {
  const tooltipStyle = {
    top: `${y}px`,
    left: `${x}px`,
    position: "absolute",
  };

  return value?.gdp && value?.internet ? (
    <div style={tooltipStyle}>
      <Card
        title={title.cardTitle}
        style={{ width, height, fontSize: `${width * 0.1}px` }}
        size='small'
      >
        <Statistic
          value={value.internet}
          title={title.statsTitle.internet}
          formatter={FORMATTER_INTERNET}
        ></Statistic>
        <Statistic
          value={value.gdp}
          title={title.statsTitle.gdp}
          formatter={FORMATTER_GDP}
        ></Statistic>
      </Card>
    </div>
  ) : (
    ""
  );
}
