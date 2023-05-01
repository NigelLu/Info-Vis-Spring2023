/** @format */

import Home from "./pages/Home";
import RegionCorrelation from "./pages/RegionCorrelation";
import CountryCorrelation from "./pages/CountryCorrelation";

export default [
  { path: "/home", pageName: "Home", component: Home },
  {
    path: "/region-correlation",
    pageName: "Region Correlation",
    component: RegionCorrelation,
  },
  {
    path: "/country-correlation",
    pageName: "Country Correlation",
    component: CountryCorrelation,
  },
];
