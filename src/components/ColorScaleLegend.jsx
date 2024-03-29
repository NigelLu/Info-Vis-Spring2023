/** @format */

import * as d3 from "d3";
import React, { useMemo } from "react";
import { camelToFlat } from "../common/dataUtils";

const NUM_OF_TICKS = 5;

export default function ColorScaleLegend({
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
        {colorPalette.map((color, idx) => (
          <g key={`${color}-${idx}-rect`} transform={`translate(${legendColorScale(color)}, 0)`}>
            <rect fill={color} height={height} width={width / colorPalette.length}></rect>
          </g>
        ))}
        {colorToLabel.map((color, idx) => (
          <g key={`${color}-${idx}-label`} transform={`translate(${legendColorScale(color)}, 0)`}>
            <line y1={height * 0.75} y2={height * 1.25} stroke={"rgba(0,0,0,0.5)"} />
            <text
              style={{ textAnchor: "start", fontSize: "0.5rem" }}
              transform={`translate(-${height * 0.15}, ${height * 2}) rotate(60)`}
            >
              {`${Math.ceil(legendLabelScale(color))}${unit}`}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}
