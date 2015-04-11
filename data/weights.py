#### OUT OF DATE, don't use this ####

import json
from pprint import pprint


## Will overwrite Feedback.json: CAUTION##
def weights():
    json_data = open("feedback.json")
    data = json.load(json_data)
    i = 0
    for key in data:
        i += 1
        for value in data[key]:
            i += 1
            measure = data[key][value]
            new = {
                "measure":measure,
                "weight":100,
            }
            data[key][value] = {}
            data[key][value]["current_average"] = new
    json.dump(data, open("feedback.json", 'wb'))