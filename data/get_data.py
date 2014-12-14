##### exports week data to a nice json dictionary ######
import os
import json
from datareader import week_data

def touch(filename, times=None):
    """Unix touch command."""
    with open(filename, 'a'):
        os.utime(filename, times)


def create_json():
    """Creates a file called data.json filled with necessary info."""
    touch("data.json")
    data = week_data()
    json.dump(data, open("data.json", 'wb'))

create_json()