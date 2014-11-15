import csv
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

def week_data():
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
        days[key] = day_data(key)
    return days

def day_data(day):
    """Returns a dictionary of hours of a given day mapped
    to how crowded it is at that hour.
    day - string, such as 'Monday'"""
    day = {}
    hours = open_hours(day)
    for hour in hours:
        c = get_string(day, hour)
        day[hour] = c
    return day


def open_hours(day):
    """Returns a range of the hours that the RSF is open
    on a given day. Goes from early to late, military time."""
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1]
    if day == "Sunday" or day == "Saturday":
        hours = hours[2:]
    if day == "Friday" or day == "Saturday":
        hours = hours[:-2]
    return hours

def get_string(day, hour):
    """Returns a string representing how crowded the RSF
    is on this day at this hour."""
    # FIX ME

