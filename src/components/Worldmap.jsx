/** @format */

import React from "react";
import { scaleLinear } from "d3";
import ColorScaleLegend from "./ColorScaleLegend";
import { pickYearlyData, getMostRecentYear } from "../common/dataUtils";
import { geoPath, geoEqualEarth, geoMercator, geoEquirectangular } from "d3-geo";

// * CONSTANTS

export const GEO_MERCATOR = "geoMercator";
export const GEO_EQUAL_EARTH = "geoEqualEarth";
export const GEO_EQUIRECTANGULAR = "geoEquirectangular";
export const DEFAULT_COLOR_PALETTE = [
  "#fff5eb",
  "#fff5ea",
  "#fff4e9",
  "#fff4e8",
  "#fff3e7",
  "#fff3e6",
  "#fff2e6",
  "#fff2e5",
  "#fff1e4",
  "#fff1e3",
  "#fff0e2",
  "#fff0e1",
  "#ffefe0",
  "#ffefdf",
  "#ffeede",
  "#ffeedd",
  "#feeddc",
  "#feeddb",
  "#feecda",
  "#feecd9",
  "#feebd8",
  "#feebd7",
  "#feead6",
  "#feead5",
  "#fee9d4",
  "#fee9d3",
  "#fee8d2",
  "#fee8d1",
  "#fee7d0",
  "#fee6cf",
  "#fee6ce",
  "#fee5cc",
  "#fee5cb",
  "#fee4ca",
  "#fee4c9",
  "#fee3c8",
  "#fee2c7",
  "#fee2c5",
  "#fee1c4",
  "#fee1c3",
  "#fee0c2",
  "#fedfc0",
  "#fedfbf",
  "#fedebe",
  "#feddbd",
  "#feddbb",
  "#fedcba",
  "#fedbb9",
  "#fedab7",
  "#fddab6",
  "#fdd9b4",
  "#fdd8b3",
  "#fdd8b2",
  "#fdd7b0",
  "#fdd6af",
  "#fdd5ad",
  "#fdd4ac",
  "#fdd4aa",
  "#fdd3a9",
  "#fdd2a7",
  "#fdd1a6",
  "#fdd0a4",
  "#fdd0a3",
  "#fdcfa1",
  "#fdcea0",
  "#fdcd9e",
  "#fdcc9d",
  "#fdcb9b",
  "#fdca99",
  "#fdc998",
  "#fdc896",
  "#fdc795",
  "#fdc693",
  "#fdc591",
  "#fdc490",
  "#fdc38e",
  "#fdc28d",
  "#fdc18b",
  "#fdc089",
  "#fdbf88",
  "#fdbe86",
  "#fdbd84",
  "#fdbc83",
  "#fdbb81",
  "#fdba7f",
  "#fdb97e",
  "#fdb87c",
  "#fdb77a",
  "#fdb679",
  "#fdb577",
  "#fdb475",
  "#fdb374",
  "#fdb272",
  "#fdb171",
  "#fdb06f",
  "#fdaf6d",
  "#fdae6c",
  "#fdad6a",
  "#fdac69",
  "#fdab67",
  "#fdaa65",
  "#fda964",
  "#fda762",
  "#fda661",
  "#fda55f",
  "#fda45e",
  "#fda35c",
  "#fda25b",
  "#fda159",
  "#fda058",
  "#fd9f56",
  "#fd9e55",
  "#fd9d53",
  "#fd9c52",
  "#fd9b50",
  "#fd9a4f",
  "#fc994d",
  "#fc984c",
  "#fc974a",
  "#fc9649",
  "#fc9548",
  "#fc9346",
  "#fc9245",
  "#fc9143",
  "#fc9042",
  "#fb8f40",
  "#fb8e3f",
  "#fb8d3e",
  "#fb8c3c",
  "#fb8b3b",
  "#fa8a3a",
  "#fa8938",
  "#fa8837",
  "#fa8736",
  "#fa8534",
  "#f98433",
  "#f98332",
  "#f98230",
  "#f8812f",
  "#f8802e",
  "#f87f2c",
  "#f77e2b",
  "#f77d2a",
  "#f77b29",
  "#f67a27",
  "#f67926",
  "#f57825",
  "#f57724",
  "#f57623",
  "#f47522",
  "#f47420",
  "#f3731f",
  "#f3721e",
  "#f2701d",
  "#f26f1c",
  "#f16e1b",
  "#f16d1a",
  "#f06c19",
  "#f06b18",
  "#ef6a17",
  "#ef6916",
  "#ee6815",
  "#ed6714",
  "#ed6614",
  "#ec6513",
  "#ec6312",
  "#eb6211",
  "#ea6110",
  "#ea6010",
  "#e95f0f",
  "#e85e0e",
  "#e85d0e",
  "#e75c0d",
  "#e65b0c",
  "#e55a0c",
  "#e4590b",
  "#e4580b",
  "#e3570a",
  "#e25609",
  "#e15509",
  "#e05408",
  "#df5308",
  "#de5208",
  "#dd5207",
  "#dc5107",
  "#db5006",
  "#da4f06",
  "#d94e06",
  "#d84d05",
  "#d74c05",
  "#d64c05",
  "#d54b04",
  "#d44a04",
  "#d24904",
  "#d14804",
  "#d04804",
  "#cf4703",
  "#cd4603",
  "#cc4503",
  "#cb4503",
  "#c94403",
  "#c84303",
  "#c74303",
  "#c54203",
  "#c44103",
  "#c24102",
  "#c14002",
  "#bf3f02",
  "#be3f02",
  "#bd3e02",
  "#bb3e02",
  "#ba3d02",
  "#b83d02",
  "#b73c02",
  "#b53b02",
  "#b43b02",
  "#b23a03",
  "#b13a03",
  "#af3903",
  "#ae3903",
  "#ac3803",
  "#ab3803",
  "#aa3703",
  "#a83703",
  "#a73603",
  "#a53603",
  "#a43503",
  "#a33503",
  "#a13403",
  "#a03403",
  "#9f3303",
  "#9d3303",
  "#9c3203",
  "#9b3203",
  "#993103",
  "#983103",
  "#973003",
  "#953003",
  "#942f03",
  "#932f03",
  "#922e04",
  "#902e04",
  "#8f2d04",
  "#8e2d04",
  "#8d2c04",
  "#8b2c04",
  "#8a2b04",
  "#892b04",
  "#882a04",
  "#862a04",
  "#852904",
  "#842904",
  "#832804",
  "#812804",
  "#802704",
  "#7f2704",
];

export default function Worldmap({
  x,
  y,
  width,
  height,
  csvData,
  geoData,
  projection,
  highlightCountry,
  setHighlightCountry,
  field = "internetUsersPercentage",
  colorPalette = DEFAULT_COLOR_PALETTE,
}) {
  const mostRecentYear = getMostRecentYear(csvData);
  const mostRecentYearDataMap = pickYearlyData(csvData, mostRecentYear, field);
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range([colorPalette[0], colorPalette[colorPalette.length - 1]]);

  let path = null;
  switch (projection) {
    case GEO_MERCATOR:
      path = geoPath(geoMercator().fitSize([width, height], geoData));
      break;
    case GEO_EQUAL_EARTH:
      path = geoPath(geoEqualEarth().fitSize([width, height], geoData));
      break;
    case GEO_EQUIRECTANGULAR:
      path = geoPath(geoEquirectangular().fitSize([width, height], geoData));
      break;
    default:
      path = geoPath(geoEquirectangular().fitSize([width, height], geoData));
      break;
  }

  const colorScaleLegendProps = {
    unit: "%",
    name: field,
    colorPalette,
    x: width * 0.85,
    y: height * 1.025,
    scale: colorScale,
    width: width * 0.1,
    height: height * 0.025,
  };

  return (
    <>
      <text
        x={`${width * 0.5}`}
        y={`${height * 0.05}`}
        style={{
          fontWeight: "bold",
          textAnchor: "middle",
          fontSize: `${Math.floor(height * 0.04)}px`,
        }}
      >{`Internet User Percentage Choropleth Map (Year ${mostRecentYear})`}</text>
      <g transform={`translate(${x}, ${y})`}>
        {geoData.features.map((feature) => {
          return (
            <path
              d={path(feature)}
              className={"boundary"}
              key={feature.properties.name + "boundary"}
              onMouseLeave={() => setHighlightCountry(null)}
              onMouseEnter={() => setHighlightCountry(feature)}
              style={{
                fill: colorScale(mostRecentYearDataMap[feature.properties.name]) || "gray",
              }}
            />
          );
        })}
        <path
          fill='none'
          stroke='black'
          d={path(highlightCountry)}
          strokeWidth={`${width * 0.0005}`}
        />
        <ColorScaleLegend {...colorScaleLegendProps} />
      </g>
    </>
  );
}
