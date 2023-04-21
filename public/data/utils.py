import json
from tqdm import tqdm
from typing import List


def buildAttributeIndexMap(attribute_list: List[str]) -> dict[str, int]:
    return {attribute: idx for idx, attribute in enumerate(attribute_list)}


def removeTrail(data: List[List[str]]) -> None:
    for row in data:
        row.pop()


def innerJoin(data_a: List[List[str]], data_b: List[List[str]], join_attributes: List[str], select_attributes: List[str]) -> List[List[str]]:
    attribute_index_map_a = buildAttributeIndexMap(data_a[0])
    attribute_index_map_b = buildAttributeIndexMap(data_b[0])

    result = []
    for row_a in tqdm(data_a[1:]):
        for row_b in data_b[1:]:
            # * check if all values of join_attributes match
            is_match = True
            for attribute in join_attributes:
                is_match = is_match and [row_a[attribute_index_map_a[attribute]]] == [
                    row_b[attribute_index_map_b[attribute]]]
                if not is_match:
                    break

            # * if matched, then append a new row to result
            if is_match:
                # * init a new row
                matched_row = []

                # * append values of select_attributes to matched row
                for attribute in select_attributes:
                    if attribute in attribute_index_map_a:
                        matched_row.append(
                            row_a[attribute_index_map_a[attribute]])
                        continue

                    matched_row.append(row_b[attribute_index_map_b[attribute]])

                result.append(matched_row)

    return result


def flattenGDP(data: List[List[str]],
               years: List[str] = ["1960", "1961", "1962", "1963", "1964", "1965",
                                   "1966", "1967", "1968", "1969", "1970", "1971",
                                   "1972", "1973", "1974", "1975", "1976", "1977",
                                   "1978", "1979", "1980", "1981", "1982", "1983",
                                   "1984", "1985", "1986", "1987", "1988", "1989",
                                   "1990", "1991", "1992", "1993", "1994", "1995",
                                   "1996", "1997", "1998", "1999", "2000", "2001",
                                   "2002", "2003", "2004", "2005", "2006", "2007",
                                   "2008", "2009", "2010", "2011", "2012", "2013",
                                   "2014", "2015", "2016", "2017", "2018", "2019",
                                   "2020", "2021", ]) -> List[List[str]]:
    attribute_index_map = buildAttributeIndexMap(data[0])
    result = [["country", "year", "GdpPerCapita"]]

    for row in data:
        for year in years:
            result.append([row[attribute_index_map["country"]],
                          year, row[attribute_index_map[year]]])

    return result


def buildCountryRegionMap(json_file_path: str) -> dict[str, str]:
    # * read and load the json list
    country_region_list = None
    with open(json_file_path, "r") as f:
        country_region_list = json.loads(f.read())

    country_region_map = {}
    for country_info in country_region_list:
        country_region_map[country_info['name']] = country_info['sub-region']

    return country_region_map
