/** @format */

import * as d3 from "d3";
import React from "react";

export default function CategoryLegend({ x, y, width, height, categoryColorMap }) {
  const categories = Object.getOwnPropertyNames(categoryColorMap);

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        {categories.map((category, idx) => (
          <g key={category}>
            <rect
              x={width * 0.1}
              width={width * 0.15}
              fill={categoryColorMap[category]}
              height={height / categories.length - height * 0.05}
              y={(height / categories.length) * idx + height * 0.05}
            ></rect>
            <text
              x={width * 0.3}
              y={(height / categories.length) * (idx + 1)}
              style={{ textAnchor: "start" }}
            >
              {category}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}
