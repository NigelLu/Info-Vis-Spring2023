/** @format */

import { Spin } from "antd";
import LineChart from "../components/LineChart";
import React, { useEffect, useState } from "react";
import { FIELD_TYPE_MAP } from "../common/dataUtils";
import { pickCountryData } from "../common/dataUtils";
import Worldmap, { GEO_MERCATOR } from "../components/Worldmap";

// #region CONSTANTS
const LAYOUT = {
  width: 0.85,
  height: 0.85,
  worldmap: {
    width: 0.8,
    height: 0.4,
  },
  lineChart: {
    width: 0.15,
    height: 0.25,
    breakWidth: 0.05,
  },
};

function lineChartPropFactory({
  data,
  windowWidth,
  windowHeight,
  layout = LAYOUT,
  lineChartConfigs,
}) {
  return lineChartConfigs.map((config, idx) => {
    return {
      data,
      key: idx,
      dotRadius: config.dotRadius || 2,
      dotColor: config.dotColor || "#5468ff",
      lineColor: config.lineColor || "#5468ff",
      width: Math.floor(windowWidth * layout.lineChart.width),
      height: Math.floor(windowHeight * layout.lineChart.height),
      y: windowHeight * (layout.worldmap.height + 0.125),
      x: windowWidth * (layout.lineChart.width * idx + layout.lineChart.breakWidth * (idx + 1)),
      xFieldInfo: {
        type: config.xField.type,
        field: config.xField.field,
        categories: config.xField.categories,
      },
      yFieldInfo: {
        type: config.yField.type,
        field: config.yField.field,
        categories: config.yField.categories,
      },
    };
  });
}

// #endregion CONSTANTS

export default function Home({
  csvData,
  geoData,
  windowWidth,
  windowHeight,
  csvDataPending,
  fetchGeoDataPending,
}) {
  const [countryData, setCountryData] = useState([]);
  const [highlightCountry, setHighlightCountry] = useState(null);

  const lineChartConfigs = [
    {
      dotRadius: 2,
      dotColor: "#5468ff",
      lineColor: "#5468ff",
      xField: {
        field: "year",
        type: FIELD_TYPE_MAP.categorical,
        categories: countryData.map((d) => d.year),
      },
      yField: {
        field: "internetUsersPercentage",
        type: FIELD_TYPE_MAP.quantitative,
      },
    },
    {
      dotRadius: 2,
      dotColor: "#5468ff",
      lineColor: "#5468ff",
      xField: {
        field: "year",
        type: FIELD_TYPE_MAP.categorical,
        categories: countryData.map((d) => d.year),
      },
      yField: {
        field: "broadbandSubscription",
        type: FIELD_TYPE_MAP.quantitative,
      },
    },
    {
      dotRadius: 2,
      dotColor: "#5468ff",
      lineColor: "#5468ff",
      xField: {
        field: "year",
        type: FIELD_TYPE_MAP.categorical,
        categories: countryData.map((d) => d.year),
      },
      yField: {
        field: "cellularSubscription",
        type: FIELD_TYPE_MAP.quantitative,
      },
    },
    {
      dotRadius: 2,
      dotColor: "#5468ff",
      lineColor: "#5468ff",
      xField: {
        field: "year",
        type: FIELD_TYPE_MAP.categorical,
        categories: countryData.map((d) => d.year),
      },
      yField: {
        field: "GdpPerCapita",
        type: FIELD_TYPE_MAP.quantitative,
      },
    },
  ];

  // #region props
  const worldmapProps = {
    x: 0,
    y: windowHeight * LAYOUT.worldmap.height * 0.15,
    geoData,
    csvData,
    highlightCountry,
    setHighlightCountry,
    project: GEO_MERCATOR,
    width: Math.floor(windowWidth * LAYOUT.worldmap.width),
    height: Math.floor(windowHeight * LAYOUT.worldmap.height),
  };
  // #endregion props

  useEffect(() => {
    setCountryData(
      highlightCountry ? pickCountryData(csvData, highlightCountry.properties.name) : [],
    );
  }, [highlightCountry]);

  return csvDataPending || fetchGeoDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <div>
      <svg
        viewBox={`0 0 ${Math.floor(windowWidth * LAYOUT.width)} ${Math.floor(
          windowHeight * LAYOUT.height,
        )}`}
      >
        <Worldmap {...worldmapProps} />
        {lineChartPropFactory({
          data: countryData,
          windowWidth,
          windowHeight,
          layout: LAYOUT,
          lineChartConfigs,
        }).map((lineChartProps) => (
          <LineChart {...lineChartProps} />
        ))}
      </svg>
    </div>
  );
}
