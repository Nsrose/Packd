##### tools to export data to a nice json file######
import os
import json
from datareader import week_data

def touch(filename, times=None):
    """Unix touch command."""
    with open(filename, 'a'):
        os.utime(filename, times)


def create_json(data, filename):
    """Creates a file called data.json filled with necessary info."""
    touch(filename)
    json.dump(data, open(filename, 'wb'))

# create_json(week_data(), "data.json")