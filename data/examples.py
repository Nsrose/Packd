import csv
####### EXAMPLES ########
''' This is a file of examples of how to open the csv file of data
and get things out of it. Please add to this when you find interesting
things.

Please add anything you find as a function, as below, so people can use it
in their code. Act like you are building an API.'''

### Nick ###
def show_data():
    """This is an example of how to open the CSV file for reading.
    Simply pattern match these steps and you can iterate through the rows
    in the table.
    
    NOTE: I cut off the iteration at 10 here, just to show you how it looks.
    Feel free to mess around with this and see what you can do. Try not to
    print the whole table--it has almost 6 million rows."""
    with open("ScansforStudents.csv", "rU") as csvfile:
        reader = csv.reader(csvfile, delimiter = ' ', quotechar = '|')
        k = 0
        for row in reader:
            print(row)
            if k == 10:
                break
            k += 1
#############