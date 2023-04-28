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
