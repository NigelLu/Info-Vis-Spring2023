/** @format */

import Home from "./pages/Home";
import CountryTrend from "./pages/CountryTrend";
import WorldComparison from "./pages/WorldComparison";

export default [
  { path: "/home", pageName: "Home", component: Home },
  {
    path: "/country-trend",
    pageName: "Country Trend",
    component: CountryTrend,
  },
  {
    path: "/world-comparison",
    pageName: "World Comparison",
    component: WorldComparison,
  },
];
