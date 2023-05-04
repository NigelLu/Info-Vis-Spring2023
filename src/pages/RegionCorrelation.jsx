/** @format */

import { Spin } from "antd";
import React, { useMemo } from "react";
import Heatmap from "../components/Heatmap";
import { FIELD_TYPE_MAP } from "../common/dataUtils";

// #region CONSTANTS
const GEO_REGIONS = [
  "South Asia",
  "North America",
  "European Union",
  "Sub-Saharan Africa",
  "East Asia and Pacific",
  "Europe and Central Asia",
  "Latin America and Caribbean",
  "Middle East and North Africa",
];
const LAYOUT = {
  width: 0.85,
  height: 0.8,
  header: {
    width: 0.8,
    height: 0.1,
  },
  heatmap: {
    width: 0.8,
    height: 0.5,
  },
};
// #endregion CONSTANTS

export default function RegionCorrelation({
  csvData,
  windowWidth,
  windowHeight,
  csvDataPending,
  highlightedBlockInfo,
  setHighlightedBlockInfo,
}) {
  // * build a map from geoRegion to Array of data
  const [allYears, dataByGeoRegion] = useMemo(() => {
    const geoRegionData = csvData.filter((d) => GEO_REGIONS.includes(d.country));
    const allYears = geoRegionData.reduce((prev, d) => {
      if (prev.includes(d.year)) return prev;
      prev.push(d.year);
      return prev;
    }, []);

    const dataByGeoRegion = geoRegionData.reduce((prev, d) => {
      if (d.country in prev) prev[d.country].push(d);
      else prev[d.country] = [d];
      return prev;
    }, {});

    return [allYears, dataByGeoRegion];
  }, [csvData]);

  const heatmapConfigs = {
    data: dataByGeoRegion,
    highlightedBlockInfo,
    setHighlightedBlockInfo,
    heatmapColorRange: ["#e9f6e4", "#00441b"],
    width: Math.floor(windowWidth * LAYOUT.heatmap.width),
    height: Math.floor(windowHeight * LAYOUT.heatmap.height),
    xFieldInfo: {
      field: "year",
      categories: allYears,
      type: FIELD_TYPE_MAP.categorical,
    },
    yFieldInfo: {
      field: "country",
      categories: GEO_REGIONS,
      type: FIELD_TYPE_MAP.categorical,
    },
  };

  return csvDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <>
      <div
        style={{
          textAlign: "center",
          width: `${windowWidth * LAYOUT.header.width}`,
          height: `${windowHeight * LAYOUT.header.height}`,
        }}
      >
        <span>
          <h1>Region Correlation</h1>
        </span>
      </div>
      <svg
        viewBox={`0 0 ${Math.floor(windowWidth * LAYOUT.width)} ${Math.floor(
          windowHeight * LAYOUT.height,
        )}`}
      >
        <Heatmap {...heatmapConfigs}></Heatmap>
      </svg>
    </>
  );
}
