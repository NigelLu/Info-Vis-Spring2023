/** @format */

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useState, useEffect } from "react";

export default function fetchGeoData(topoJsonPath) {
  const [geoData, setGeoData] = useState(null);
  const [fetchGeoDataPending, setFetchGeoDataPending] = useState(true);

  useEffect(() => {
    d3.json(topoJsonPath).then((topoJsonData) => {
      setGeoData(topojson.feature(topoJsonData, topoJsonData.objects.countries));
      setFetchGeoDataPending(false);
    });
  }, []);

  return { geoData, fetchGeoDataPending };
}
