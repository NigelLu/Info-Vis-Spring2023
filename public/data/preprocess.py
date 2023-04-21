import os
import csv
import time
from tqdm import tqdm
from utils import removeTrail, innerJoin, flattenGDP

# region CONSTANTS
save_dir = "./public/data"
inner_join_attributes = ["country", "year"]
save_path = os.path.join(save_dir, "result.csv")
gdp_file_path = "./public/data/GDP_Per_Capita.csv"
internet_users_file_path = "./public/data/Internet_Users.csv"
select_attributes = ["index", "country", "code", "year", "cellularSubscription",
                     "internetUsersPercentage", "internetUserNum", "broadbandSubscription", "GdpPerCapita"]
country_region_json_path = "/Users/xiaoclu/Documents/Personal/Git/Info-Vis-Spring2023/public/data/country_region_map.json"
# endregion CONSTANTS


start_time = time.time()
print(
    f">>> Preprocessing started at {time.ctime(start_time)}\n")


# !step
print(f">>> Reading files...\n")

# * read gdp per capita file
gdp_per_capita = None
with open(gdp_file_path, "r", newline="") as f:
    gdp_per_capita = [row for row in csv.reader(f)]
removeTrail(gdp_per_capita)

# * read internet users file
internet_users = None
with open(internet_users_file_path, "r", newline="") as f:
    internet_users = [row for row in csv.reader(f)]


# !step
print(f">>> Flattening GDP Table...\n")
gdp_per_capita = flattenGDP(gdp_per_capita)


# !step
print(f">>> Performing inner join....\n")
join_result = innerJoin(gdp_per_capita, internet_users,
                        inner_join_attributes, select_attributes)


# !step
print(f">>> Saving result to {save_path}...\n")
with open(save_path, "w") as f:
    # * write the header line
    f.write(f"{','.join(select_attributes)}\n")
    for row in tqdm(join_result):
        f.write(f"{','.join(row)}\n")

end_time = time.time()
print(f">>> Preprocessing finished in {end_time-start_time}s")
