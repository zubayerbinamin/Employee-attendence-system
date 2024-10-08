# Employee-attendence-system
An employee attendance web application where employees input their ID and a clock-in time is stored in a database for their ID using an API. When an employee clocks out, it updates the object in the database using another API. The employer can then access the database in a table on the website.

Commissionaires site manager used my website for test runs.

Technologies used: Python, JavaScript, Django, APIs

# Motivation 
All my colleagues and I would use pen and paper to clock in by writing our employee ID, full name, etc. on a sheet of paper, which my site manager would then take hours to tediously type into an Excel spreadsheet. To improve this, I developed an employee attendance web application to make it efficient for my colleagues to clock in to create an attendance database while saving my site manager hours of tedious data entry work.

# Quick Start
Either

a. Running the web application link

NOTE: may take 50 seconds for the web application to load for the first time as a free hosting service is used

Link: [commissionaries.onrender.com/ClockInSystem/ ](https://commissionaries.onrender.com/ClockInSystem/) 

Navigate to the following Link:
Type in the employee ID and press submit. It will record your clock-in time. Click on ‘log’ to see the database. Then, clock out using the same employee ID, and it will update the object in the database with the clock-out time.

b.	Running the code on your computer

Open VS code and make sure to install Django with:

	pip3 install Django 

After opening the clock-in app in VS code, make sure your terminal shows ‘your-computer’/ClockInOutSystem/ClockInApp. You can do this by typing the following in the terminal:

	cd ClockInApp
 
Then type:

	python manage.py makemigrations
 
Then type:

	python manage.py migrate
 
Then run the server:

	Python manage.py runserver
 
Then click on the link it generates, and then type the following in the browser:

	‘link-generated-by-your-computer’/ClockInSystem

