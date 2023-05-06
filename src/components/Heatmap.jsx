/** @format */

import * as d3 from "d3";
import React from "react";
import { List } from "antd";
import { locateData } from "../common/dataUtils";
import { camelToFlat } from "../common/dataUtils";
import ColorScaleLegend from "./ColorScaleLegend";
import { FIELD_TYPE_MAP } from "../common/dataUtils";

const LEFT_TITLE_COL_WIDTH = 0.175;
const PADDING = { top: 0.1, right: 0.05, left: 0.1, bottom: 0.1 };
const NOTE_LAYOUT = {
  width: 0.5,
  height: 0.5,
  padding: 0.005,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "black",
};
const DEFAULT_COLOR_PALETTE = [
  "#f7fcf5",
  "#f6fcf4",
  "#f6fcf4",
  "#f5fbf3",
  "#f5fbf2",
  "#f4fbf2",
  "#f4fbf1",
  "#f3faf0",
  "#f2faf0",
  "#f2faef",
  "#f1faee",
  "#f1faee",
  "#f0f9ed",
  "#f0f9ec",
  "#eff9ec",
  "#eef9eb",
  "#eef8ea",
  "#edf8ea",
  "#ecf8e9",
  "#ecf8e8",
  "#ebf7e7",
  "#ebf7e7",
  "#eaf7e6",
  "#e9f7e5",
  "#e9f6e4",
  "#e8f6e4",
  "#e7f6e3",
  "#e7f6e2",
  "#e6f5e1",
  "#e5f5e1",
  "#e4f5e0",
  "#e4f4df",
  "#e3f4de",
  "#e2f4dd",
  "#e1f4dc",
  "#e1f3dc",
  "#e0f3db",
  "#dff3da",
  "#def2d9",
  "#ddf2d8",
  "#ddf2d7",
  "#dcf1d6",
  "#dbf1d5",
  "#daf1d4",
  "#d9f0d3",
  "#d8f0d2",
  "#d7efd1",
  "#d6efd0",
  "#d5efcf",
  "#d4eece",
  "#d4eece",
  "#d3eecd",
  "#d2edcb",
  "#d1edca",
  "#d0ecc9",
  "#cfecc8",
  "#ceecc7",
  "#cdebc6",
  "#ccebc5",
  "#cbeac4",
  "#caeac3",
  "#c9eac2",
  "#c8e9c1",
  "#c6e9c0",
  "#c5e8bf",
  "#c4e8be",
  "#c3e7bd",
  "#c2e7bc",
  "#c1e6bb",
  "#c0e6b9",
  "#bfe6b8",
  "#bee5b7",
  "#bde5b6",
  "#bbe4b5",
  "#bae4b4",
  "#b9e3b3",
  "#b8e3b2",
  "#b7e2b0",
  "#b6e2af",
  "#b5e1ae",
  "#b3e1ad",
  "#b2e0ac",
  "#b1e0ab",
  "#b0dfaa",
  "#aedfa8",
  "#addea7",
  "#acdea6",
  "#abdda5",
  "#aadca4",
  "#a8dca3",
  "#a7dba2",
  "#a6dba0",
  "#a5da9f",
  "#a3da9e",
  "#a2d99d",
  "#a1d99c",
  "#9fd89b",
  "#9ed799",
  "#9dd798",
  "#9bd697",
  "#9ad696",
  "#99d595",
  "#97d494",
  "#96d492",
  "#95d391",
  "#93d390",
  "#92d28f",
  "#91d18e",
  "#8fd18d",
  "#8ed08c",
  "#8ccf8a",
  "#8bcf89",
  "#8ace88",
  "#88cd87",
  "#87cd86",
  "#85cc85",
  "#84cb84",
  "#82cb83",
  "#81ca82",
  "#80c981",
  "#7ec980",
  "#7dc87f",
  "#7bc77e",
  "#7ac77c",
  "#78c67b",
  "#77c57a",
  "#75c479",
  "#74c478",
  "#72c378",
  "#71c277",
  "#6fc276",
  "#6ec175",
  "#6cc074",
  "#6bbf73",
  "#69bf72",
  "#68be71",
  "#66bd70",
  "#65bc6f",
  "#63bc6e",
  "#62bb6e",
  "#60ba6d",
  "#5eb96c",
  "#5db86b",
  "#5bb86a",
  "#5ab769",
  "#58b668",
  "#57b568",
  "#56b467",
  "#54b466",
  "#53b365",
  "#51b264",
  "#50b164",
  "#4eb063",
  "#4daf62",
  "#4caf61",
  "#4aae61",
  "#49ad60",
  "#48ac5f",
  "#46ab5e",
  "#45aa5d",
  "#44a95d",
  "#42a85c",
  "#41a75b",
  "#40a75a",
  "#3fa65a",
  "#3ea559",
  "#3ca458",
  "#3ba357",
  "#3aa257",
  "#39a156",
  "#38a055",
  "#379f54",
  "#369e54",
  "#359d53",
  "#349c52",
  "#339b51",
  "#329a50",
  "#319950",
  "#30984f",
  "#2f974e",
  "#2e964d",
  "#2d954d",
  "#2b944c",
  "#2a934b",
  "#29924a",
  "#28914a",
  "#279049",
  "#268f48",
  "#258f47",
  "#248e47",
  "#238d46",
  "#228c45",
  "#218b44",
  "#208a43",
  "#1f8943",
  "#1e8842",
  "#1d8741",
  "#1c8640",
  "#1b8540",
  "#1a843f",
  "#19833e",
  "#18823d",
  "#17813d",
  "#16803c",
  "#157f3b",
  "#147e3a",
  "#137d3a",
  "#127c39",
  "#117b38",
  "#107a37",
  "#107937",
  "#0f7836",
  "#0e7735",
  "#0d7634",
  "#0c7534",
  "#0b7433",
  "#0b7332",
  "#0a7232",
  "#097131",
  "#087030",
  "#086f2f",
  "#076e2f",
  "#066c2e",
  "#066b2d",
  "#056a2d",
  "#05692c",
  "#04682b",
  "#04672b",
  "#04662a",
  "#03642a",
  "#036329",
  "#026228",
  "#026128",
  "#026027",
  "#025e27",
  "#015d26",
  "#015c25",
  "#015b25",
  "#015a24",
  "#015824",
  "#015723",
  "#005623",
  "#005522",
  "#005321",
  "#005221",
  "#005120",
  "#005020",
  "#004e1f",
  "#004d1f",
  "#004c1e",
  "#004a1e",
  "#00491d",
  "#00481d",
  "#00471c",
  "#00451c",
  "#00441b",
];

export default function Heatmap({
  data,
  width,
  height,
  xFieldInfo,
  yFieldInfo,
  setHighlightedBlockInfo,
  colorPalette = DEFAULT_COLOR_PALETTE,
}) {
  const NOTE = [
    `Hover your mouse over each rectangle to see the detailed data of each cell`,
    `The gray rectanles means there is no data/incomplete data for this specific cell`,
    `The size of the rectangles in the heatmap encodes ${camelToFlat(
      "gdpPerCapita",
    )}. The bigger the rectangle, the greater the value`,
  ];
  // * colorScale
  const internetUsersColorScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([colorPalette[0], colorPalette[colorPalette.length - 1]]);

  // * sizeScale
  const columnWidth =
    ((1 - (PADDING.right + PADDING.left + LEFT_TITLE_COL_WIDTH + 0.025)) * width) /
    xFieldInfo.categories.length;

  const gdpPerCapitaSizeScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        Object.getOwnPropertyNames(data).reduce((prev, cur) => {
          prev.push(...data[cur]);
          return prev;
        }, []),
        (d) => d.GdpPerCapita,
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

  const colorScaleLegendProps = {
    unit: "%",
    name: "internetUserPercentage",
    colorPalette,
    x: width * 0.75,
    y: height * 1.05,
    width: width * 0.1,
    height: height * 0.025,
    scale: internetUsersColorScale,
  };

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
                    height={gdpPerCapitaSizeScale(d.GdpPerCapita)}
                    onMouseLeave={() => setHighlightedBlockInfo({})}
                    width={gdpPerCapitaSizeScale(d.GdpPerCapita) * 0.5}
                    fill={internetUsersColorScale(d.internetUsersPercentage)}
                    y={
                      yScale(yTickVal) +
                      yTickOffset * 0.5 -
                      gdpPerCapitaSizeScale(d.GdpPerCapita) * 0.5
                    }
                    onMouseEnter={(evt) =>
                      setHighlightedBlockInfo({
                        data: d,
                        y: evt.clientY,
                        x: evt.clientX,
                      })
                    }
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

        {/* Legend */}
        <ColorScaleLegend {...colorScaleLegendProps} />

        {/* Note */}
        <g transform={`translate(0, ${height * (1.15 - PADDING.bottom)})`}>
          <foreignObject width={width * NOTE_LAYOUT.width} height={height * NOTE_LAYOUT.height}>
            <div
              xmlns='http://www.w3.org/1999/xhtml'
              width={width * NOTE_LAYOUT.width}
              height={height * NOTE_LAYOUT.height}
              style={{
                borderRadius: `${NOTE_LAYOUT.borderRadius}`,
                padding: `${height * NOTE_LAYOUT.padding}px`,
                border: `${NOTE_LAYOUT.borderWidth} ${NOTE_LAYOUT.borderStyle} ${NOTE_LAYOUT.borderColor}`,
              }}
            >
              <h3 style={{ marginBlock: "2px", color: "brown" }}>Note</h3>
              {NOTE.map((note, idx) => (
                <p key={`${note}-${idx + 1}`} style={{ marginBlock: "2px", color: "gray" }}>
                  {`${idx + 1}. ${note}`}
                </p>
              ))}
            </div>
          </foreignObject>
        </g>
      </g>
    </>
  );
}
