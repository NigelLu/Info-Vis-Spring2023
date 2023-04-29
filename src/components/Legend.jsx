/** @format */

import * as d3 from "d3";
import React, { useMemo, useEffect } from "react";

const NUM_OF_TICKS = 5;

export function camelToFlat(camel) {
  const wordArr = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  wordArr[0] = `${wordArr[0][0].toUpperCase()}${wordArr[0].slice(1, wordArr[0].length)}`;

  return wordArr.join(" ");
}

export default function Legend({
  x,
  y,
  unit,
  name,
  scale,
  width,
  height,
  colorPalette,
  ticks = NUM_OF_TICKS,
}) {
  const label = camelToFlat(name);
  const colorToLabel = [];
  for (let i = 0; i < colorPalette.length; i += Math.floor(colorPalette.length / ticks)) {
    colorToLabel.push(colorPalette[i]);
  }
  const legendColorScale = useMemo(() => d3.scaleBand().domain(colorPalette).range([0, width]));
  const legendLabelScale = useMemo(() => d3.scaleBand().domain(colorPalette).range(scale.domain()));

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <text
          style={{ textAnchor: "start", fontSize: "0.5rem" }}
          transform={`translate(0, -${height * 0.25})`}
        >
          {label}
        </text>
        {colorPalette.map((color) => (
          <g key={`${color}-rect`} transform={`translate(${legendColorScale(color)}, 0)`}>
            <rect fill={color} height={height} width={width / colorPalette.length}></rect>
          </g>
        ))}
        {colorToLabel.map((color) => (
          <g key={`${color}-label`} transform={`translate(${legendColorScale(color)}, 0)`}>
            <line y1={height * 0.75} y2={height * 1.25} stroke={"rgba(0,0,0,0.5)"} />
            <text
              style={{ textAnchor: "start", fontSize: "0.5rem" }}
              transform={`translate(-${height * 0.15}, ${height * 1.5}) rotate(60)`}
            >
              {`${Math.ceil(legendLabelScale(color))}${unit}`}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}
