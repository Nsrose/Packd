##############################################################
### This script will take what comes from datareader.py and ##
### create a better json dict for data learning. #############
##############################################################

import json
from datareader import week_data
from get_data import create_json


strings_to_ints = {
    "Not Crowded":1,
    "Mildly Crowded":2,
    "Very Crowded":3,
    "Extreme":4,
};

ints_to_strings = {
    1:"Not Crowded",
    2:"Mildly Crowded",
    3:"Very Crowded",
    4:"Extreme",
};

def modulate_data(week_data):
    """Adds more fields to each day, hour value in the dictionary"""
    new_data = {}
    i = 0
    for key in week_data:
        i += 1
        new_data[key] = {}
        for value in week_data[key]:
            i += 1
            measure = week_data[key][value]
            new = {
                "measure":measure,
                "number": strings_to_ints[measure],
                "weight":100,
            }
            new_data[key][value] = {}
            new_data[key][value]["current_average"] = new

            for i in range(1, 5):
                measure = ints_to_strings[i]
                extra_field = {
                    "measure":measure,
                    "number":i,
                    "weight":0,
                }
                new_data[key][value][measure] = extra_field

    return new_data