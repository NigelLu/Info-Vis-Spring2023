/** @format */

import * as d3 from "d3";
import React from "react";
import { locateData } from "../common/dataUtils";
import { FIELD_TYPE_MAP } from "../common/dataUtils";

const LEFT_TITLE_COL_WIDTH = 0.175;
const PADDING = { top: 0.1, right: 0.05, left: 0.1, bottom: 0.1 };

export default function Heatmap({
  data,
  width,
  height,
  xFieldInfo,
  yFieldInfo,
  heatmapColorRange,
}) {
  // * colorScale
  const internetUsersColorScale = d3.scaleLinear().domain([0, 100]).range(heatmapColorRange);

  // * sizeScale
  const columnWidth =
    ((1 - (PADDING.right + PADDING.left + LEFT_TITLE_COL_WIDTH + 0.025)) * width) /
    xFieldInfo.categories.length;

  const gdpPerCapitaSizeScale = d3
    .scaleLinear()
    .domain([
      0,
      Math.max(
        d3.max(data["North America"], (d) => d.GdpPerCapita),
        d3.max(data["European Union"], (d) => d.GdpPerCapita),
      ),
    ])
    .range([columnWidth * 0.5, columnWidth * 1.5]);

  // * xScale
  let xScale = null;
  let xTickOffset = 0;
  let xScaleTicks = null;
  switch (xFieldInfo.type) {
    case FIELD_TYPE_MAP.categorical:
      xScale = d3
        .scaleBand()
        .domain(xFieldInfo.categories)
        .range([0, width - (PADDING.right + PADDING.left + LEFT_TITLE_COL_WIDTH + 0.025) * width]);
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
  console.log(yScaleTicks);
  return (
    <>
      <g transform={`translate(${PADDING.left * width}, ${PADDING.top * height})`}>
        {/* Horizontal Table Rules */}
        {yScaleTicks.map((tickVal) => (
          <g key={tickVal}>
            <text y={yScale(tickVal) + yTickOffset * 0.1} style={{ fontSize: `${width * 0.01}` }}>
              {tickVal}
            </text>
            <line
              stroke='black'
              strokeWidth='1'
              y1={yScale(tickVal)}
              y2={yScale(tickVal)}
              x2={width - (PADDING.left + PADDING.right) * width}
            ></line>
          </g>
        ))}

        {/* Vertical Table Rule */}
        <line
          stroke='black'
          strokeWidth='1'
          y2={yScale(yScaleTicks[0])}
          x1={width * LEFT_TITLE_COL_WIDTH}
          x2={width * LEFT_TITLE_COL_WIDTH}
          y1={yScale(yScaleTicks[yScaleTicks.length - 1]) + yTickOffset * 0.7}
        ></line>

        <g transform={`translate(${LEFT_TITLE_COL_WIDTH * width}, ${yScale(yScaleTicks[0])})`}>
          {xScaleTicks.map((tickVal, idx) =>
            idx % 6 === 0 || idx === xScaleTicks.length - 1 ? (
              <g key={tickVal} transform={`translate(${xScale(tickVal) + xTickOffset}, 0)`}>
                <line y2={5} x1={0} x2={0} stroke='black' strokeWidth='1'></line>
                <text
                  x={height * 0.025}
                  y={height * 0.025}
                  transform='rotate(60)'
                  style={{ fontSize: `${width * 0.01}` }}
                >
                  {tickVal}
                </text>
              </g>
            ) : (
              <g key={tickVal}></g>
            ),
          )}
        </g>

        {/* Heatmap Color Blocks */}
        <g transform={`translate(${LEFT_TITLE_COL_WIDTH * width}, 0)`}>
          {xScaleTicks.map((xTickVal) => (
            <g key={`${xTickVal}-iter`}>
              {yScaleTicks.map((yTickVal) => {
                const d = locateData(data[yTickVal], ["year"], [xTickVal]);

                return d ? (
                  <rect
                    x={xScale(xTickVal) + xTickOffset}
                    key={`${xTickVal}-${yTickVal}-rect`}
                    y={
                      yScale(yTickVal) +
                      yTickOffset * 0.5 -
                      gdpPerCapitaSizeScale(d.GdpPerCapita) * 0.5
                    }
                    width={gdpPerCapitaSizeScale(d.GdpPerCapita) * 0.5}
                    height={gdpPerCapitaSizeScale(d.GdpPerCapita)}
                    fill={internetUsersColorScale(d.internetUsersPercentage)}
                  ></rect>
                ) : (
                  <rect
                    x={xScale(xTickVal) + xTickOffset}
                    key={`${xTickVal}-${yTickVal}-rect`}
                    y={yScale(yTickVal) + yTickOffset * 0.5 - 6}
                    width={6}
                    height={12}
                    fill={"gray"}
                  ></rect>
                );
              })}
            </g>
          ))}
        </g>
      </g>
    </>
  );
}
