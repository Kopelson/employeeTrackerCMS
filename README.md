# Employee Tracker CMS
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. This project involved architecting and building a solution for managing a company's employees using node, inquirer, and MySQL.

  Link to video demonstration: https://www.youtube.com/watch?v=I9s21EbcL1Y

## Overview
![start](https://user-images.githubusercontent.com/57735283/99856516-fe0a0100-2b3d-11eb-972f-6d1142250f47.gif)


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
#### Create Departments
![createDepartment](https://user-images.githubusercontent.com/57735283/99856535-06fad280-2b3e-11eb-97b6-4e90718c9b04.gif)

#### Create Roles
![createRole](https://user-images.githubusercontent.com/57735283/99856538-082bff80-2b3e-11eb-98f0-cdf88d2999fe.gif)

#### Create Employees
![createEmployee](https://user-images.githubusercontent.com/57735283/99856536-07936900-2b3e-11eb-98aa-b21b6f0674a6.gif)

  * View departments, roles, employees
#### View Different Tables
  ![view](https://user-images.githubusercontent.com/57735283/99856543-08c49600-2b3e-11eb-811d-2fffe892a0f0.gif)

  * Update employee roles
#### Update Employee Role  
![update](https://user-images.githubusercontent.com/57735283/99857202-8dfc7a80-2b3f-11eb-9ffe-6bb8a26e3072.gif)

  * Delete departments, roles, and employees
#### Delete Departments
![deleteDepartment](https://user-images.githubusercontent.com/57735283/99856540-082bff80-2b3e-11eb-9ec2-9cdd95ecd5e3.gif)

#### Delete Role
![deleteRole](https://user-images.githubusercontent.com/57735283/99856542-082bff80-2b3e-11eb-8d45-3cfbde9ad1e5.gif)

#### Delete Employee
![deleteEmployee](https://user-images.githubusercontent.com/57735283/99856541-082bff80-2b3e-11eb-9a1f-741b8d615e3f.gif)

  * View Comprehensive Employee Directory and Exit Program
#### Comprehensive Employee Directory and Exit
![exit](https://user-images.githubusercontent.com/57735283/99856519-006c5b00-2b3e-11eb-998b-7cbc5f9dec60.gif)

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

The prompts in my server.js need queries to company_db to fill arrays with data which take time. I added an extra prompt before the array was used that fill the choices for the list type prompts. If the database becomes very large I fear this will need more time to populate the array. I noticed if the prompt immediately asked the user to pick from the array the array would be empty crashing or freezing the application. In a future update I plan on promisfying these so the prompt will wait for this information to populate.

## Extras 

documentation on exports/requires https://nodejs.org/api/modules.html

## Credits

* Chalk added colors to my console logs - https://www.npmjs.com/package/chalk

* Pretty Console Logs to create good looking tables in my console logs = https://www.npmjs.com/package/pretty-console-logs

* Inqirer to use cli prompts to get information from the user - https://www.npmjs.com/package/inquirer

* MySql to connect to a MySQL database - https://www.npmjs.com/package/mysql

* Trilogy Education Services for project setup
