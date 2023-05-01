/** @format */

import * as d3 from "d3";
import React from "react";

export default function Heatmap({ data, width, height, gdpThreshold }) {
  return (
    <div>
      <svg width={width} height={height}></svg>
    </div>
  );
}
