/** @format */

export function getMostRecentYear(csvData) {
  let mostRecentYear = csvData[0].year;

  csvData.forEach((d) => {
    mostRecentYear = Math.max(mostRecentYear, d.year);
  });

  return mostRecentYear;
}

export function pickYearlyData(csvData, year, field) {
  const yearlyDataMap = {};
  csvData
    .filter((d) => d.year === Number(year))
    .forEach((d) => {
      if (d.country in yearlyDataMap) {
        yearlyDataMap[d.country] = (yearlyDataMap[d.country] + d[field]) / 2;
        return;
      }

      yearlyDataMap[d.country] = d[field];
    });

  return yearlyDataMap;
}

export function pickCountryData(csvData, country) {
  return csvData.filter((d) => d.country.toLowerCase() === country.toLowerCase());
}

export function camelToFlat(camel) {
  const wordArr = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  wordArr[0] = `${wordArr[0][0].toUpperCase()}${wordArr[0].slice(1, wordArr[0].length)}`;

  return wordArr.join(" ");
}

export const FIELD_TYPE_MAP = {
  categorical: "categorical",
  quantitative: "quantitative",
};
