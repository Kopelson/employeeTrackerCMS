//require dependencies 
const inquirer = require("inquirer");
const db = require("./assets/js/company_db");
//this function is the initial prompt for the user
function start(){
    //inquirer allows a cli prompt to gather info from the user
    inquirer
        .prompt(
            {   //type of prompt is a list the user can choose different options
                //this allows the user to choose from a list
                type: "list",
                //this is the message that is displayed to the user
                message: "What would you like to do?",
                //this is an array of choices the user can cycle through an choose from
                choices: ["VIEW Employee Directory", "VIEW Company Roles", "VIEW Company Departments", "VIEW Comprehensive Employee", "ADD Company Employee", "ADD Company Role", "ADD Company Department", "UPDATE An Employee Role", "DELETE a Company Employee", "DELETE a Company Role", "DELETE a Company Department", "EXIT"],
                //this is the name of data is stored under
                name: "action"
            }
            //this handles the callback of the prompt
            ).then(function(answer) {
                //switch statement to handle the different the choices
                switch (answer.action) {
                    case "VIEW Employee Directory":
                        //SELECT id, first_name, last_name FROM company_db.employee;
                        db.viewQuery("id, first_name, last_name", "company_db.employee");
                        break;
                    case "VIEW Company Roles":
                        //SELECT id, title, salary FROM company_db.role;
                        db.viewQuery("id, title, salary", "company_db.role");
                        break;
                    case "VIEW Company Departments":
                        //SELECT * FROM company_db.department;
                        db.viewQuery("*", "company_db.department");
                        break; 
                    case "ADD Company Department":
                        //start the prompt that gathers the necessary info to add a department
                        addDepartmentPrompt();
                        break;
                    case "ADD Company Role": 
                        //start the prompt that gathers the necessary info to add a role
                        addRolePrompt();
                        break;
                    case "ADD Company Employee": 
                        //start the prompt that gathers the necessary info to add an employee
                        addEmployeePrompt()
                        break;
                    case "UPDATE An Employee Role":
                        //start the prompt that gathers the necessary info to update an employees role
                        updateEmployeeRolePrompt()
                        break;
                    case "DELETE a Company Department":
                        //start the prompt that gathers the necessary info to delete a department
                        deleteDepartmentPrompt()
                        break;
                    case "DELETE a Company Role":
                        //start the prompt that gathers the necessary info to delete a role
                        deleteRolePrompt()
                        break;
                    case "DELETE a Company Employee":
                        //start the prompt that gathers the necessary info to delete an employee
                        deleteEmployeePrompt() 
                        break;
                    case "VIEW Comprehensive Employee":
                        //a query that grabs all relative info for each employee
                        db.comprehensiveEmployeeQuery()
                        break;
                    case "EXIT":
                        //ends the connection to the database and ends the application
                        db.endConnection();
                }
            })
}
//gets the name of the new department, capitalizes the first letter that is entered, and inserts the new department to the database
function addDepartmentPrompt(){
    //inquirer allows a cli prompt to gather info from the user
    inquirer
        .prompt(
            {
                //this type input allows the user to enter in their own info
                type: "input",
                //this displays a message to the user
                message: "Please enter the name of the new department you want to add: ",
                //this stores the data with this name
                name: "name"
            }
            //this handles the callback of the prompt
            ).then( function(answer) {
            //This capitalizes the first word of the input tutorial https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
            const name = answer.name;
            const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
            //INSERT INTO department (name) VALUES ("name_value");
            db.addQuery(`department`, `name`, `"${capitalizeName}"`)
        })
}
//gets the name of the new role, the salary, and the user selects what department this role falls under. Then this is inserted into the database.
function addRolePrompt(){
        //this initializes an array that will store the info that will be gathered from the database
        let departmentNameArray = [];
        //this returns an array populated with department data
        db.getDepartmentNames(departmentNameArray);
        //inquirer allows a cli prompt to gather info from the user
        inquirer
            .prompt(
            [
                {
                    //this allows the user to enter the name of the new role
                    type: "input",
                    //this displays the prompt message
                    message: "Enter in the name of the new role you want to add: ",
                    //this stores the data with this name
                    name: "title"
                },
                {
                    //this type number only takes in a number and will crash if its anything else
                    type: "number",
                    //this displays the prompt message
                    message: "Enter in the salary of this new role: ",
                    //this stores the data with this name
                    name: "salary"
                },
                {
                    //this allows the user to choose from a list
                    type: "list",
                    //this displays the prompt message
                    message: "What department is this role fall under?",
                    //this function generates a choice array with just the names of the departments
                    choices: function() {
                        //this initializes an array to hold just the name of each department
                        let choiceArray = [];
                        //this loops through the departmentNameArray and push the name of each department to the choiceArray
                        for (let i = 0; i < departmentNameArray.length; i++) {
                          //this pushes the department name to choiceArray
                          choiceArray.push(departmentNameArray[i][1]);
                        }
                        //returns the array of department names for the user to choose from
                        return choiceArray;
                      },
                    //this stores the data with this name
                      name: "departmentID"
                }
            ]
            //this handles the callback of the prompt
            ).then( function(answer) {
                //initialize a variable to store the data we need to push to the query
                let chosenItem;
                //this loops through the departmentNameArray to match the answer that was chosen by the user
                for (let i = 0; i <departmentNameArray.length; i++) {
                  //this adds the logic of matching the array index that we need the id of
                  if (departmentNameArray[i][1] === answer.departmentID) {
                    //this assigns the correct data we need to push which is the id of the chosen department
                    chosenItem = departmentNameArray[i][0];
                  }
                }
                //INSERT INTO role (title, salary, departmentID) VALUES ("title_value", salary_value, departmentID_value);
                db.addQuery("role", `title, salary, departmentID`, `"${answer.title}", ${answer.salary}, ${chosenItem}`);
            })
}
//gets the first and last name of the new employee and their new role then inserts it into the database
function addEmployeePrompt(){
    //this initializes an array that will store the info that will be gathered from the database
    let roleNameArray = [];
    //this returns an array of role data
    db.getRoleNames(roleNameArray);
      //inquirer allows a cli prompt to gather info from the user
      inquirer
        .prompt(
            [
            {
                //this allows the user to enter in data
                type: "input",
                //this displays the prompt message
                message: "Please enter the first name of the new Employee: ",
                //this stores the data with this name
                name: "first_name"
            },
            {
                //this allows the user to enter in data
                type: "input",
                //this displays the prompt message
                message: "Please enter the last name of the new Employee: ",
                //this stores the data with this name
                name: "last_name"
            },
            {
                //this allows the user to choose from a list
                type: "list",
                //this displays the prompt message
                message: "What role does this employee have?",
                 //this function generates a choice array with just the names of different roles
                choices: function() {
                    //initializes an array to store just the role names
                    let choiceArray = [];
                    //this loops through the roleNameArray and pushes the role names to choiceArray
                    for (let i = 0; i < roleNameArray.length; i++) {
                      //this pushes just the role names to the choiceArray
                      choiceArray.push(roleNameArray[i][1]);
                    }
                    //this returns an array full of role names
                    return choiceArray;
                },
                //this stores the data with this name        
                name: "roleID"
            }
        ]
        //this handles the callback of the prompt
        ).then( function(answer) {
            //initialize a variable to store the data we need to push to the query
            let chosenRoleID;
            //this matches the choice with the index we need to get the id of role
            for (let i = 0; i < roleNameArray.length; i++) {
            //this adds the logic to find the index that match the user choice
            if (roleNameArray[i][1] === answer.roleID) {
                //this assigns the id of the role name that was chosen
                chosenRoleID = roleNameArray[i][0];
            }
        }
        //this adds a new employee to the database
        db.addQuery("employee", "first_name, last_name, roleID", `"${answer.first_name}", "${answer.last_name}", ${chosenRoleID}`);        
        });
}
//this confirms if they want to update an employee to give time to load the necessary arrays with choices.
//then user picks an employee and a new role and then the data base is updated with the user selections.
function updateEmployeeRolePrompt(){
    //this initializes an array that will store the info that will be gathered from the database
    let employeeNameArray = [];
    //this initializes an array that will store the info that will be gathered from the database
    let roleNameArray = [];
    //these return an array with both employee and role data
    db.getEmployeeNames(employeeNameArray);
    db.getRoleNames(roleNameArray);
    //inquirer allows a cli prompt to gather info from the user
    inquirer
        .prompt(
            [
                {
                    //this type is a simple yes or no the user confirms
                    type: "confirm",
                    //this displays the prompt message
                    message: "You have chosen to update an employee's role within the company Are you sure you want to continue?",
                    //this stores the data with this name
                    name: "warning"
                },
                {
                    //this allows the user to choose from a list
                    type: "list",
                    //this displays the prompt message
                    message: "Who would you like to update?",
                     //this function generates a choice array with just the names of the different employees
                    choices: function() {
                        //this initializes an array to store just the names of the employees
                        let choiceArrayEmployee = [];
                        //this loops through employeeNameArray to push just the first and last name of each employee
                        for (let i = 0; i < employeeNameArray.length; i++) {
                            //this pushes the first and last name of the current index to the choiceArrayEmployee
                            choiceArrayEmployee.push(`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}`);
                        }
                        //this returns an array of the first and last names of each employee
                        return choiceArrayEmployee;
                    },
                    //this stores the data with this name
                    name: "employeeID",
                    //this only runs if the confirm warning is true
                    when: (answers) => answers.warning === true         
                },
                {
                    //this allows the user to choose from a list
                    type: "list",
                    //this displays the prompt message
                    message: "What is their new role?",
                     //this function generates a choice array with just the names of different roles
                    choices: function() {
                        //this initializes an array to store just role names
                        let choiceArrayRole = [];
                        //this loops through the roleNameArray and pushes the role names to the choiceArrayRole
                        for (let i = 0; i < roleNameArray.length; i++) {
                            //this pushes just the role name of the current index of the roleNameArray to choiceArrayRole
                            choiceArrayRole.push(roleNameArray[i][1]);
                        }
                        //this returns an array with just the name of each role
                        return choiceArrayRole;
                    },
                    //this stores the data with this name
                    name: "roleID",
                    //this only runs if the confirm warning is true
                    when: (answers) => answers.warning === true   
                }
            ]
            //this handles the callback of the prompt
            ).then(function(answer) {
            //if user says no to the confirm the application restarts
            if (answer.warning === false){
                return start();
            }
            //initialize a variable to store the data we need to push to the query
            let chosenEmployeeID;
                //this matches the choice with the index we need to get the id of an employee
                for (let i = 0; i <employeeNameArray.length; i++) {
                    //this adds the logic of the user choice and matches the index we need to get the employee id
                    if (`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}` === answer.employeeID) {
                        //this assigns the id to chosenEmployeeID
                        chosenEmployeeID = employeeNameArray[i][0];
                    }
                }
            //initialize a variable to store the data we need to push to the query
            let chosenRoleID;
                //this matches the choice with the index we need to get the id of role
                for (let i = 0; i <roleNameArray.length; i++) {
                    //this adds the logic of which index we need to get the role id
                    if (roleNameArray[i][1] === answer.roleID) {
                        //this assigns the role id to the chosenRoleID
                        chosenRoleID = roleNameArray[i][0];
                    }
                }
            //UPDATE company_db.employee
	        //SET roleID = roleID_value
            //WHERE id = id_value;
            //this updates the employee's role in the database
            db.updateQuery(chosenRoleID, chosenEmployeeID);
            })
}
//warns the user that deleting a department will also delete all relative info, then user chooses from a list and then all relative info is deleted from the database
function deleteDepartmentPrompt(){
    //this initializes an array that will store the info that will be gathered from the database
    let departmentNameArray = [];
    //this returns an array of department data
    db.getDepartmentNames(departmentNameArray);
        //inquirer allows a cli prompt to gather info from the user
        inquirer
                .prompt([
                    {
                        //this type is a simple yes or no the user confirms
                        type: "confirm",
                        //this displays the prompt message
                        message: "WARNING! Deleting a department will also delete all related roles and employees within a department. Are you sure you want to continue?",
                        name: "warning"
                    },
                    {
                        //this allows the user to choose from a list
                        type: "list",
                        //this displays the prompt message
                        message: "What department would you like to delete?",
                        //this stores an array of the different choices the user can pick from
                        choices: function() {
                            //this initializes an empty array that will be filled with just the department names
                            let choiceArray = [];
                            //this loops through the departmentNameArray and pushes just the name of each department
                            for (let i = 0; i < departmentNameArray.length; i++) {
                              //this pushes the department name of the current index to the choiceArray
                              choiceArray.push(departmentNameArray[i][1]);
                            }
                            //this returns an array of just the department names for the user to choose from
                            return choiceArray;
                          },
                        //this stores the data with this name
                        name: "departmentID",
                        //this only runs if the confirm warning is true
                        when: (answers) => answers.warning === true         
                    }
                ]
                //this handles the callback of the prompt
                ).then( function(answer) {
                    //if user says no to the confirm the application restarts
                    if (answer.warning === false){
                        return start();
                    }
                    //initialize a variable to store the data we need to push to the query
                    let chosenDepartmentID;
                    //this matches the choice with the index we need to get the id of department
                    for (let i = 0; i <departmentNameArray.length; i++) {
                        //this adds the logic of matching the index we need to get the department id
                        if (departmentNameArray[i][1] === answer.departmentID) {
                            //this assigns the department id to chosenDepartmentID
                            chosenDepartmentID = departmentNameArray[i][0];
                        }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    //this deletes the department and all related info
                    db.deleteQuery("company_db.department", chosenDepartmentID)
                });
}
//warns the user that deleting a role will also delete all relative info, then user chooses a role to delete from a list, then all relative info is deleted from the database
function deleteRolePrompt(){
    //this initializes an array that will store the info that will be gathered from the database
    let roleNameArray = [];
    db.getRoleNames(roleNameArray);
        //inquirer allows a cli prompt to gather info from the user
        inquirer
                .prompt([
                    {
                        //this type is a simple yes or no the user confirms
                        type: "confirm",
                        //this displays the prompt message
                        message: "WARNING! Deleting a role will also delete all related employees within a role. Are you sure you want to continue?",
                        //this stores the user confirm
                        name: "warning"
                    },
                    {
                        //this allows the user to choose from a list
                        type: "list",
                        //this displays the prompt message
                        message: "What role would you like to delete?",
                        //this stores the different options the user can choose from
                        choices: function() {
                            //this initializes an array that will store the different role names
                            let choiceArray = [];
                            //this loops through the roleNameArray to push just the role names to the choiceArray
                            for (let i = 0; i < roleNameArray.length; i++) {
                              //this pushes the role name of the current index to the choiceArray
                              choiceArray.push(roleNameArray[i][1]);
                            }
                            //this returns an array with the different role names
                            return choiceArray;
                        },
                        //this stores the data with this name
                        name: "roleID",
                        //this only runs if the confirm warning is true
                        when: (answers) => answers.warning === true         
                    }
                ]
                //this handles the callback of the prompt
                ).then( function(answer) {
                    //if user says no to the confirm the application restarts
                    if (answer.warning === false){
                        return start();
                    }
                    //initialize a variable to store the data we need to push to the query
                    let chosenRoleID;
                    //this matches the choice with the index we need to get the id of role
                    for (let i = 0; i <roleNameArray.length; i++) {
                        //this adds the logic of what index we need to get the id of the chosen role
                        if (roleNameArray[i][1] === answer.roleID) {
                            //this assigns the id of the chosen role to chosenRoleID
                            chosenRoleID = roleNameArray[i][0];
                        }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    //this deletes the role and all related data from the database
                    db.deleteQuery("company_db.role", chosenRoleID)
                });
}
//this warns the user they are about to delete an employee, then user choose an employee from a list, and then the chosen employee is deleted from the database
function deleteEmployeePrompt(){
    //this initializes an array that will store the info that will be gathered from the database
    let employeeNameArray = [];
    db.getEmployeeNames(employeeNameArray);
        //inquirer allows a cli prompt to gather info from the user
        inquirer
                .prompt([
                    {
                        //this type is a simple yes or no the user confirms
                        type: "confirm",
                        //this displays the prompt message
                        message: "WARNING! Deleting an employee will remove them from the Employee directory. Are you sure you want to continue?",
                        //this stores the data with this name
                        name: "warning"
                    },
                    {
                        //this allows the user to choose from a list
                        type: "list",
                        //this displays the prompt message
                        message: "What employee would you like to delete?",
                        //this stores the different choices the user can choose from
                        choices: function() {
                            //this initializes an array to store the employees first and last names
                            let choiceArray = [];
                            //this loops through the employeeNameArray to fill the choiceArray with first and last names
                            for (let i = 0; i < employeeNameArray.length; i++) {
                              //this pushes the first and last name of the current index to the choiceArray
                              choiceArray.push(`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}`);
                            }
                            //this returns an array with employees first and last names
                            return choiceArray;
                        },
                        //this stores the data with this name
                        name: "employeeID",
                        //this only runs if the confirm warning is true
                        when: (answers) => answers.warning === true         
                    }
                ]
                //this handles the callback of the prompt
                ).then( function(answer) {
                    //if user says no to the confirm the application restarts
                    if (answer.warning === false){
                        return start();
                    }
                    //initialize a variable to store the data we need to push to the query
                    let chosenEmployeeID;
                    //this matches the choice with the index we need to get the id of an employee
                    for (let i = 0; i <employeeNameArray.length; i++) {
                        //this adds the logic of what index we need to get the employees id
                        if (`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}` === answer.employeeID) {
                            //this assigns the chosen employee id to chosenEmployeeID
                            chosenEmployeeID = employeeNameArray[i][0];
                        }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    //this deletes the chosen employee from the database
                    db.deleteQuery("company_db.employee", chosenEmployeeID)
                });
}
//initialize the first prompt
start();
//export start function
exports.start = start;