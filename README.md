# Employee Tracker CMS
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. This project involved architecting and building a solution for managing a company's employees using node, inquirer, and MySQL.

  Link to video demonstration: https://www.youtube.com/watch?v=I9s21EbcL1Y

## Overview

### Database Schema
* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  
### Command-line Application Usages:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Delete departments, roles, and employees


### USER STORY

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```
## Installation
How do you install this on in your own enviorment? Here are some guidelines:

* Clone the repository to your own device

* Run the company_dbSeeds.sql in MySQL Workbench
  -Note: Feel free to change the dummy information in this file
  
* Add your own password to the company_db.js 
  **IMPORTANT** this is a critical step to connect to your database
  
* In you terminal of choice install the necessary dependencies that are located in the package.json

* Start the server either through "nmp start" or "node server.js" command

* Enjoy!


## Potential  Bugs

The prompts in my server.js need queries to company_db.js to fill arrays with data which take time. I added an extra prompt before the array was used that fill the choices for the list type prompts. If the database becomes very large I fear this will need more time to populate the array. I noticed if the prompt immediately asked the user to pick from the array the array would be empty crashing or freezing the application. In a future update I plan on promisfying these so the prompt will wait for this information to populate.

## Extras 

documentation on exports/requires https://nodejs.org/api/modules.html

## Credits

* Chalk added colors to my console logs - https://www.npmjs.com/package/chalk

* Pretty Console Logs to create good looking tables in my console logs = https://www.npmjs.com/package/pretty-console-logs

* Inqirer to use cli prompts to get information from the user - https://www.npmjs.com/package/inquirer

* MySql to connect to a MySQL database - https://www.npmjs.com/package/mysql

* Trilogy Education Services for project setup
