/** @format */

import { csv } from "d3";
import { useState, useEffect } from "react";

// region CONSTANTS
const numberAttributes = [
  "internetUserNum",
  "cellularSubscription",
  "broadbandSubscription",
  "internetUsersPercentage",
];
// endregion CONSTANTS

// * fetch and store csv
export default function fetchCsv(csvPath) {
  const [csvData, setCsvData] = useState(null);
  const [csvDataPending, setCsvDataPending] = useState(true);

  useEffect(() => {
    csv(csvPath)
      .then((data) => {
        data.forEach((d) =>
          numberAttributes.forEach((attributeName) => (d[attributeName] = +d[attributeName])),
        );
        setCsvData(data);
        setCsvDataPending(false);
      })
      .catch((err) => {
        console.error(`CSV fetch with path ${csvPath} failed: ${err}`);
        setCsvDataPending(true);
        setCsvData(null);
      });
  }, [csvPath]);

  return { csvData, csvDataPending };
}
