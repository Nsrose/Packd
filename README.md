Packd App Group
===============

Our Vision
-------------
We plan to make the Berkeley Recreational Sports Facility more accessible by providing users with information on the capacity and occupancy of the RSF. We predict that our app will also even out the variance between peak times and quiet times at the RSF as users will have the opportunity to optimize their workout schedules. 

<img src="http://i.imgur.com/efmVWEK.jpg">

[Google Doc with team descriptions, organizational diagram, and goals/tasks](https://docs.google.com/a/berkeley.edu/document/d/1pTSaqID6JxPohzLH787dy19iM2VnWdEP0j4ula4_LXo/edit)

First Iteration
------------
Very simple app. Perhaps literally just the text “There are 40 people in the RSF right now, and the occupancy is 200 people.”
Second Iteration
------------
More informative visualization:
Graphs over time based on past data (the data would need to be saved in our back-end)
Nth Iteration
------------
More complex functionality:
- User preferences and notifications
- Predictive statistics

Team Structure
============
Our team is composed of members of the UC Berkeley CS Scholars Program. We are currently Sophomores studying Computer Science and we hope to learn a great deal as we develop our app!
<img src="/structure.png">


Git Notes
=========

Git is super important. It’s what we’ll be using to manage versions and make sure one person doesn’t accidentally destroy the whole project. That said, there are guidelines we’ll need to follow.

Workflow:
---------
1. cd into your Packd folder
2. Pull the changes from master into your master branch
3. Branch off into whatever branch you’re currently working on
4. Do some work/editing
5. Add /Commit/ Push your changes to your branch
6. Submit a pull request to merge your branch with master

Actual Code Example (I'm working on a branch called ButtonFix):
---------------------------------------------------------------
$ cd Packd  
$ git branch #making sure I'm on the master  
$ git checkout master #puts me on the master branch  
$ git pull origin master  
$ git checkout ButtonFix  
Do work/ editing here  
$ git add .  
$ git commit -m "fixed the button"  
$ git push origin ButtonFix  
Submit a pull request: https://help.github.com/articles/creating-a-pull-request
