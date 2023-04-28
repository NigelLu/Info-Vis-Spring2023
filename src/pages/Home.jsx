/** @format */

import React from "react";
import { Spin } from "antd";
import Worldmap, {
  GEO_MERCATOR,
  GEO_EQUAL_EARTH,
  GEO_EQUIRECTANGULAR,
} from "../components/Worldmap";

export default function Home({ csvData, csvDataPending, geoData, fetchGeoDataPending }) {
  const worldmapProps = {
    geoData,
    csvData,
    width: 1000,
    height: 600,
    project: GEO_MERCATOR,
  };
  return csvDataPending || fetchGeoDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <div>
      <Worldmap {...worldmapProps} />
    </div>
  );
}
