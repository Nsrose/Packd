## Parses data from the csv file ##
import csv

def strip_data():
    """Strips the data to remove any irrelevant info."""
    with open("ScansforStudents.csv", "rt") as csvfile:
        reader = csv.reader(csvfile, delimiter = ' ', quotechar = '|')
        for row in reader:
            #something
