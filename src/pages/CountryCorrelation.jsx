/** @format */

import { Spin, Select } from "antd";
import React, { useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import ScatterPlot from "../components/ScatterPlot";
import { FIELD_TYPE_MAP } from "../common/dataUtils";

// #region CONSTANTS
const INCOME_LEVELS = [
  "Low income",
  "High income",
  "Middle income",
  "Lower middle income",
  "Upper middle income",
  "Low and middle income",
];

const LAYOUT = {
  width: 0.85,
  height: 0.85,
  menu: {
    width: 0.8,
    height: 0.3,
  },
  incomeScatterPlot: {
    width: 0.3,
    height: 0.45,
  },
  countryScatterPlot: {
    width: 0.3,
    height: 0.45,
  },
};
// #endregion CONSTANTS

export default function CountryCorrelation({ csvData, windowWidth, windowHeight, csvDataPending }) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  // * memoize dataByIncomeLevel and countryOptions
  const [dataByIncomeLevel, countryOptions] = useMemo(() => {
    const filteredData = csvData.filter((d) => INCOME_LEVELS.includes(d.country));
    const allCountries = Array.from(new Set(csvData.map((d) => d.country)).values());
    const allCountryOptions = allCountries.map((country) => {
      return { label: country, value: country };
    });
    return [filteredData, allCountryOptions];
  }, [csvData]);

  // * memoize selectedCountryData, only update when selection changes
  const selectedCountryData = useMemo(
    () => csvData.filter((d) => selectedCountries.includes(d.country)),
    [selectedCountries],
  );

  const incomeLevelScatterPlotConfig = {
    dotRadius: 3,
    data: dataByIncomeLevel,
    dotCategoryField: "country",
    key: "incomeLevelScatterPlot",
    y: windowHeight * LAYOUT.menu.height,
    width: Math.floor(windowWidth * LAYOUT.incomeScatterPlot.width),
    height: Math.floor(windowHeight * LAYOUT.incomeScatterPlot.height),
    x:
      (windowWidth *
        (LAYOUT.width - (LAYOUT.incomeScatterPlot.width + LAYOUT.countryScatterPlot.width))) /
      3,
    xFieldInfo: {
      type: FIELD_TYPE_MAP.quantitative,
      field: "GdpPerCapita",
    },
    yFieldInfo: {
      type: FIELD_TYPE_MAP.quantitative,
      field: "internetUsersPercentage",
    },
  };

  const selectedCountryScatterPlotConfig = {
    dotRadius: 3,
    data: selectedCountryData,
    dotCategoryField: "country",
    key: "selectedCountryScatterPlot",
    y: windowHeight * LAYOUT.menu.height,
    width: Math.floor(windowWidth * LAYOUT.countryScatterPlot.width),
    height: Math.floor(windowHeight * LAYOUT.countryScatterPlot.height),
    x:
      windowWidth *
      (LAYOUT.width -
        LAYOUT.incomeScatterPlot.width -
        (LAYOUT.width - (LAYOUT.incomeScatterPlot.width + LAYOUT.countryScatterPlot.width)) / 3),
    xFieldInfo: {
      type: FIELD_TYPE_MAP.quantitative,
      field: "GdpPerCapita",
    },
    yFieldInfo: {
      type: FIELD_TYPE_MAP.quantitative,
      field: "internetUsersPercentage",
    },
  };

  return csvDataPending ? (
    <Spin size='large' spinning style={{ marginTop: "40vh" }} />
  ) : (
    <>
      <div
        style={{
          width: `${windowWidth * LAYOUT.menu.width}`,
          height: `${windowHeight * LAYOUT.menu.height}`,
        }}
      >
        <Select
          bordered
          showSearch
          allowClear
          mode='tags'
          maxTagCount='responsive'
          options={countryOptions}
          style={{ width: "30%" }}
          onChange={(values) => {
            console.log(values);
            setSelectedCountries(values);
          }}
          placeholder='search and select countries'
          suffixIcon={React.createElement(SearchOutlined, {
            style: { color: "blue" },
          })}
        />
      </div>
      <svg
        viewBox={`0 0 ${Math.floor(windowWidth * LAYOUT.width)} ${Math.floor(
          windowHeight * LAYOUT.height,
        )}`}
      >
        <ScatterPlot {...incomeLevelScatterPlotConfig} />
        <ScatterPlot {...selectedCountryScatterPlotConfig} />
      </svg>
    </>
  );
}
