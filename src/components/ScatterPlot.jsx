/** @format */

import * as d3 from "d3";
import React, { useMemo } from "react";
import CategoryLegend from "./CategoryLegend";
import { camelToFlat } from "../common/dataUtils";
import { FIELD_TYPE_MAP } from "../common/dataUtils";

function _buildCategorizedDataMap({ data, categoryField }) {
  const categories = [];
  const categoryDataMap = {};
  data.forEach((d) => {
    if (categoryDataMap[d[categoryField]]) {
      categoryDataMap[d[categoryField]].push(d);
    } else {
      categoryDataMap[d[categoryField]] = [d];
      categories.push(d[categoryField]);
    }
  });
  return [categories, categoryDataMap];
}

const CATEGORY_10_COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

export default function ScatterPlot({
  x,
  y,
  data,
  width,
  height,
  dotRadius,
  xFieldInfo,
  yFieldInfo,
  dotCategoryField,
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

  // * categoryDataMap
  const [categories, categoryDataMap, categoryColorMap] = useMemo(() => {
    const [categories, categoryDataMap] = _buildCategorizedDataMap({
      data,
      categoryField: dotCategoryField,
    });
    const categoryColorMap = categories.reduce((prev, category, idx) => {
      prev[category] = CATEGORY_10_COLORS[idx];
      return prev;
    }, {});
    return [categories, categoryDataMap, categoryColorMap];
  }, [data, dotCategoryField]);

  const categoryLegendProps = {
    x: width * 0.75,
    categoryColorMap,
    y: height * 0.7,
    width: width * 0.2,
    height: height * 0.2,
  };

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        {/* xAxis */}
        <g transform={`translate(0, ${height})`}>
          <text
            x={width}
            y={-height * 0.02}
            style={{
              textAnchor: "end",
              fontWeight: "bold",
              fontSize: `${Math.floor(height * 0.025)}px`,
            }}
          >
            {camelToFlat(xFieldInfo.field)}
          </text>
          <line stroke={"black"} x2={width} />
          {xScaleTicks.map((tickVal) => (
            <g key={tickVal} transform={`translate(${xScale(tickVal) + xTickOffset}, 0)`}>
              <line y2={5} stroke={"black"}></line>
              <text
                y={20}
                style={{ textAnchor: "middle", fontSize: `${Math.floor(height * 0.02)}px` }}
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
            y={-width * 0.05}
            transform='rotate(-90)'
            style={{
              fontWeight: "bold",
              textAnchor: "middle",
              fontSize: `${Math.floor(height * 0.025)}px`,
            }}
          >
            {camelToFlat(yFieldInfo.field)}
          </text>
          <line y2={height} stroke={"black"} />
          {yScaleTicks.map((tickVal) => (
            <g key={tickVal} transform={`translate(-5, ${yScale(tickVal) + yTickOffset})`}>
              <line x2={5} stroke={"black"} />
              <text
                y={5}
                x={-5}
                style={{ textAnchor: "end", fontSize: `${Math.floor(height * 0.02)}px` }}
              >
                {tickVal}
              </text>
            </g>
          ))}
        </g>

        {/* scatter dots & legend */}
        <g>
          {categories.map((category, idx) => {
            const dotColor = CATEGORY_10_COLORS[idx];
            return categoryDataMap[category].map((d, idx) => (
              <g
                key={`${category}-${d[xFieldInfo.field]}-${d[yFieldInfo.field]}-${dotColor}-${idx}`}
              >
                <circle
                  r={dotRadius}
                  stroke={dotColor}
                  fill={`${dotColor}99`}
                  cx={xScale(d[xFieldInfo.field]) + xTickOffset}
                  cy={yScale(d[yFieldInfo.field]) + yTickOffset}
                ></circle>
              </g>
            ));
          })}
          <CategoryLegend {...categoryLegendProps} />
        </g>
      </g>
    </>
  );
}
