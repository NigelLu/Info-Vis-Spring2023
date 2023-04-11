/** @format */

import CountryTrend from "./pages/CountryTrend";
import WorldComparison from "./pages/WorldComparison";

export default [
  {
    path: "/",
    pageName: "Country Trend",
    component: CountryTrend,
  },
  {
    path: "/world-comparison",
    pageName: "World Comparison",
    component: WorldComparison,
  },
];
