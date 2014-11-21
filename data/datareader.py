import csv
from auxiliary import *
##############################################
############# RSF DATA PARSER ################
##############################################

'''
Data Parser V 1.0
-----------------
This will parse the data from the RSF into a
format for the Packd App.
Input: Huge csv file, ScansforStudents.csv
Outut: Dictionary:
    key - day of the week
    value - another Dictionary
            key - hour
            value - String:
                "Crowded"
                "Moderate"
                "Light"

About this file:
This is built in top to bottom format. The first function,
week_data, will be the final step in the whole process of
parsing.


PLEASE INCLUDE DOCSTRINGS!
'''

#############################################

def week_data(numbers = False):
    """Returns a dictionary of days of the week mapped
    to more dictionaries of hours to crowdedness."""
    days = {
        "Sunday":{},
        "Monday":{},
        "Tuesday":{},
        "Wednesday":{},
        "Thursday":{},
        "Friday":{},
        "Saturday":{},
    }
    for key in days:
        print("Processing " + key + ":")
        days[key] = day_data(key, numbers)
    return days

def day_data(day, numbers):
    """Returns a dictionary of hours of a given day mapped
    to how crowded it is at that hour.
    day - string, such as 'Monday'"""
    day_dict = {}
    hours = open_hours(day)
    for hour in hours:
        print("Processing " + str(hour))
        c = get_string(day, hour, numbers)
        day_dict[hour] = c
    return day_dict


def open_hours(day):
    """Returns a range of the hours that the RSF is open
    on a given day. Goes from early to late, military time."""
    hours = [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
             1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 0]
    if day == "Saturday":
        hours = hours[2:]
    if day == "Sunday":
        hours = hours[2:-2]
    if day == "Friday" or day == "Saturday":
        hours = hours[:-2]
    return hours

def get_string(day, hour, numbers):
    """Returns a string representing how crowded the RSF
    is on this day at this hour.
    Sample call: get_string('Monday', 12)
    If numbers is true, will instead return the average number of
    people, not the string."""
    print("getting day data for " + day)
    day_data = get_entries_by_day(day)
    print("getting hour data for " + str(hour) + ", " + day)
    hour_data = get_entries_by_hour(day_data, hour)
    print("getting average: ")
    avg_num_ppl = get_average(hour_data)
    print(avg_num_ppl)
    if numbers:
        return avg_num_ppl
    return heuristic_string(avg_num_ppl)

def heuristic_string(average):
    """Returns how crowded it is based on how many people are here
    on average. This will probably need tweaking--it's a guess."""
    if average >= 200:
        return "Extreme"
    elif average >= 130:
        return "Very Crowded"
    elif average >= 60:
        return "Mildy Crowded"
    return "Not Crowded"


def get_average(hour_data):
    """Returns the average number of people present at the RSF across
    several different days at a specific time."""
    counts = [0]
    count_index = 0
    current_date = hour_data[0][0]
    for row in hour_data:
        if row[0] != current_date:
            counts.append(0)
            count_index += 1
            current_date = row[0]
        counts[count_index] += 1
    return reduce(lambda x, y: x + y, counts) / len(counts) 

def get_entries_by_hour(day_data, hour):
    """Returns all rows in the data of a day between HOUR and HOUR + 1."""
    index = 0
    def filter_func(row):
        curr_time = int(row[1])
        return curr_time >= hour and curr_time < (hour + 100)
    time_data = list(filter(filter_func, day_data))
    return time_data

def get_entries_by_location(location, prefix = True):
    """Returns a list of all rows in the table where the location matches the
    inputted string, such as 'Atrium S'
    If prefix is true, then will match at locations starting with
    the given location. Example: 'Atrium' will now match both 'Atrium N' and
    'Atrium S'."""
    result = []
    with open("ScansforStudents.csv", "rU") as csvfile:
        reader = csv.reader(csvfile, delimiter = ',', quotechar = '|')
        for row in reader:
            row_location = row[-1]
            if prefix:
                if row_location.startswith(location):
                    result.append(row)
            else:
                if row_location == location:
                    result.append(row)
    return result


# Relevant RSF data assembled as 2D list, where each item is a row
# in the table.
RSF_DATA = get_entries_by_location('Atrium') 

def get_entries_by_day(week_day):
    """Returns a list of all rows in the table where the date matches
    the given day."""
    result = []
    for row in RSF_DATA:
        date = row[0]
        year = get_year(date)
        month = get_month(date)
        day = get_day(date)
        row_day = weekDay(year, month, day)[1]
        if row_day == week_day: 
            result.append(row)
    return result

def get_year(date):
    """Returns four digit int representing the year, extracted from a
    string date like 5/1/12"""
    date_list = date.split("/")
    return int('20' + date_list[-1])

def get_month(date):
    """Returns an int representing the month, extracted from a string date."""
    date_list = date.split("/")
    return int(date_list[0])

def get_day(date):
    """Returns an int representing the day, extracted from a string date."""
    date_list = date.split("/")
    return int(date_list[1])
