### Creates a Firebase json file ready to import ###

from datareader import week_data
from averager import modulate_data
from get_data import create_json

DYNAMIC_KEY = "-JgOwwFlFThZOqBMUnP0"

def create_data():
    """Returns the json dict corresponding to the entire firebase data"""
    print("Creating static data set...")
    static_set = week_data()
    print("Creating dynamic data set...")
    dynamic_set = modulate_data(static_set)
    print("Adjusting fields...")
    static_set["Locked"] = False
    static_set["Size"] = 0
    static_set[DYNAMIC_KEY] = dynamic_set
    return static_set



data = create_data()
create_json(data, "firebase_data.json")


