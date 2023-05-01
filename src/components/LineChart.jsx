/** @format */

import * as d3 from "d3";
import React, { useEffect } from "react";
import { camelToFlat } from "../common/dataUtils";

export const FIELD_TYPE_MAP = {
  categorical: "categorical",
  quantitative: "quantitative",
};

function _generateLinePath({ data, xScale, yScale, xField, yField, xTickOffset, yTickOffset }) {
  if (!data.length) return "";
  const start = `M${xScale(data[0][xField]) + xTickOffset} ${
    yScale(data[0][yField]) + yTickOffset
  }`;
  return data.reduce(
    (prev, d) => `${prev} L ${xScale(d[xField]) + xTickOffset} ${yScale(d[yField]) + yTickOffset}`,
    start,
  );
}

export default function LineChart({
  x,
  y,
  data,
  width,
  height,
  dotColor,
  lineColor,
  dotRadius,
  xFieldInfo,
  yFieldInfo,
}) {
  // * xScale
  let xScale = null;
  let xTickOffset = 0;
  let xScaleTicks = null;
  switch (xFieldInfo.type) {
    case FIELD_TYPE_MAP.categorical:
      xScale = d3.scaleBand().domain(xFieldInfo.categories).range([0, width]);
      xScaleTicks = xFieldInfo.categories;
      xTickOffset = width / xFieldInfo.categories.length;
      break;
    case FIELD_TYPE_MAP.quantitative:
      xScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d[xFieldInfo.field]),
          d3.max(data, (d) => d[xFieldInfo.field]),
        ])
        .range([0, width])
        .nice();
      xScaleTicks = xScale.ticks();
      break;
    default:
      console.warn("Invalid field type on line chart xField, defaulting to quantitative");
      xScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d[xFieldInfo.field]),
          d3.max(data, (d) => d[xFieldInfo.field]),
        ])
        .range([0, width])
        .nice();
      xScaleTicks = xScale.ticks();
      break;
  }

  // * yScale
  let yScale = null;
  let yTickOffset = 0;
  let yScaleTicks = null;
  switch (yFieldInfo.type) {
    case FIELD_TYPE_MAP.categorical:
      yScale = d3.scaleBand().domain(yFieldInfo.categories).range([height, 0]);
      yScaleTicks = yFieldInfo.categories;
      yTickOffset = -height / yFieldInfo.categories.length;
      break;
    case FIELD_TYPE_MAP.quantitative:
      yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d[yFieldInfo.field]),
          d3.max(data, (d) => d[yFieldInfo.field]),
        ])
        .range([height, 0])
        .nice();
      yScaleTicks = yScale.ticks();
      break;
    default:
      console.warn("Invalid field type on line chart yField, defaulting to quantitative");
      yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d[yFieldInfo.field]),
          d3.max(data, (d) => d[yFieldInfo.field]),
        ])
        .range([height, 0])
        .nice();
      yScaleTicks = yScale.ticks();
      break;
  }

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        {/* xAxis */}
        <g transform={`translate(0, ${height})`}>
          <text
            x={width}
            y={-height * 0.04}
            style={{
              textAnchor: "end",
              fontWeight: "bold",
              fontSize: `${Math.floor(height * 0.04)}px`,
            }}
          >
            {camelToFlat(xFieldInfo.field)}
          </text>
          <line stroke={"black"} x2={width} />
          {xScaleTicks.map((tickVal) => (
            <g key={tickVal} transform={`translate(${xScale(tickVal) + xTickOffset}, 0)`}>
              <line y2={5} stroke={"black"}></line>
              <text
                x={7}
                y={5}
                transform='rotate(70)'
                style={{ textAnchor: "start", fontSize: `${Math.floor(height * 0.0225)}px` }}
              >
                {tickVal}
              </text>
            </g>
          ))}
        </g>

        {/* yAxis */}
        <g>
          <text
            x={-height * 0.5}
            y={-width * 0.12}
            transform='rotate(-90)'
            style={{
              fontWeight: "bold",
              textAnchor: "middle",
              fontSize: `${Math.floor(height * 0.035)}px`,
            }}
          >
            {camelToFlat(yFieldInfo.field)}
          </text>
          <line y2={height} stroke={"black"} />
          {yScaleTicks.map((tickVal) => (
            <g key={tickVal} transform={`translate(-5, ${yScale(tickVal) + yTickOffset})`}>
              <line x2={5} stroke={"black"} />
              <text style={{ textAnchor: "end", fontSize: `${Math.floor(height * 0.025)}px` }}>
                {tickVal}
              </text>
            </g>
          ))}
        </g>

        {/* line */}
        <g>
          {data.map((d, idx) => (
            <g key={`${d[xFieldInfo.field]}-${d[yFieldInfo.field]}`}>
              <circle
                fill='none'
                r={dotRadius}
                stroke={dotColor}
                cx={xScale(d[xFieldInfo.field]) + xTickOffset}
                cy={yScale(d[yFieldInfo.field]) + yTickOffset}
              ></circle>
            </g>
          ))}
          <path
            d={_generateLinePath({
              data,
              xScale,
              yScale,
              xTickOffset,
              yTickOffset,
              xField: xFieldInfo.field,
              yField: yFieldInfo.field,
            })}
            fill='none'
            stroke={lineColor}
            strokeWidth={1}
          />
        </g>
      </g>
    </>
  );
}
