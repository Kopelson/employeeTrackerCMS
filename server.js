//require dependencies 
const inquirer = require("inquirer");
const db = require("./assets/js/company_db");

function start(){
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["VIEW Employee Directory", "VIEW Company Roles", "VIEW Company Departments", "VIEW Comprehensive Employee", "ADD Company Employee", "ADD Company Role", "ADD Company Department", "UPDATE An Employee Role", "DELETE a Company Employee", "DELETE a Company Role", "DELETE a Company Department", "EXIT"],
                name: "action"
            }).then(function(answer) {
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
                        addDepartmentPrompt();
                        break;
                    case "ADD Company Role": 
                        addCompanyPrompt();
                        break;
                    case "ADD Company Employee": 
                        addEmployeePrompt()
                        break;
                    case "UPDATE An Employee Role":
                        updateEmployeeRolePrompt()
                        break;
                    case "DELETE a Company Department":
                        deleteDepartmentPrompt()
                        break;
                    case "DELETE a Company Role":
                        deleteRolePrompt()
                        break;
                    case "DELETE a Company Employee":
                        deleteEmployeePrompt() 
                        break;
                    case "VIEW Comprehensive Employee":
                        db.comprehensiveEmployeeQuery()
                        break;
                    case "EXIT":
                        db.endConnection();
                }
            })
}

function addDepartmentPrompt(){
    inquirer
        .prompt(
            {
                type: "input",
                message: "Please enter the name of the new department you want to add: ",
                name: "name"
            }
        ).then( function(answer) {
            //This capitalizes the first word of the input tutorial https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
            const name = answer.name;
            const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
            //INSERT INTO department (name) VALUES ("name_value");
            db.addQuery(`department`, `name`, `"${capitalizeName}"`)
        })
}

function addCompanyPrompt(){
        let departmentNameArray = [];
        db.getDepartmentNames(departmentNameArray);
        inquirer
            .prompt(
            [
                {
                    type: "input",
                    message: "Enter in the name of the new role you want to add: ",
                    name: "title"
                },
                {
                    type: "number",
                    message: "Enter in the salary of this new role: ",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department is this role fall under?",
                    choices: function() {
                        let choiceArray = [];
                        for (let i = 0; i < departmentNameArray.length; i++) {
                          choiceArray.push(departmentNameArray[i][1]);
                        }
                        return choiceArray;
                      },
                    name: "departmentID"
                }
            ]
            ).then( function(answer) {
                let chosenItem;
                for (let i = 0; i <departmentNameArray.length; i++) {
                  if (departmentNameArray[i][1] === answer.departmentID) {
                    chosenItem = departmentNameArray[i][0];
                  }
                }
                //INSERT INTO role (title, salary, departmentID) VALUES ("title_value", salary_value, departmentID_value);
                db.addQuery("role", `title, salary, departmentID`, `"${answer.title}", ${answer.salary}, ${chosenItem}`);
            })
}

function addEmployeePrompt(){
    let roleNameArray = [];
    db.getRoleNames(roleNameArray);
      inquirer
        .prompt(
            [
            {
                type: "input",
                message: "Please enter the first name of the new Employee: ",
                name: "first_name"
            },
            {
                type: "input",
                message: "Please enter the last name of the new Employee: ",
                name: "last_name"
            },
            {
                type: "list",
                message: "What role does this employee have?",
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < roleNameArray.length; i++) {
                      choiceArray.push(roleNameArray[i][1]);
                    }
                    return choiceArray;
                  }
        ,
                name: "roleID"
            }
        ]
        ).then( function(answer) {
            let chosenRoleID;
            for (let i = 0; i < roleNameArray.length; i++) {
            if (roleNameArray[i][1] === answer.roleID) {
                chosenRoleID = roleNameArray[i][0];
            }
            }
                db.addQuery("employee", "first_name, last_name, roleID", `"${answer.first_name}", "${answer.last_name}", ${chosenRoleID}`);        
            });
}

function updateEmployeeRolePrompt(){
    let employeeNameArray = [];
    let roleNameArray = [];
    db.getEmployeeNames(employeeNameArray);
    db.getRoleNames(roleNameArray);
    inquirer
        .prompt(
            [
                {
                    type: "confirm",
                    message: "You have chosen to update an employee's role within the company Are you sure you want to continue?",
                    name: "warning"
                },
                {
                    type: "list",
                    message: "Who would you like to update?",
                    choices: function() {
                        let choiceArrayEmployee = [];
                        for (let i = 0; i < employeeNameArray.length; i++) {
                        choiceArrayEmployee.push(`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}`);
                        }
                        return choiceArrayEmployee;
                    },
                    name: "employeeID",
                    when: (answers) => answers.warning === true         
                },
                {
                    type: "list",
                    message: "What is their new role?",
                    choices: function() {
                        let choiceArrayRole = [];
                        for (let i = 0; i < roleNameArray.length; i++) {
                        choiceArrayRole.push(roleNameArray[i][1]);
                        }
                        return choiceArrayRole;
                    },
                    name: "roleID",
                    when: (answers) => answers.warning === true   
                }
            ]
        ).then(function(answer) {
            if (answer.warning === false){
                return start();
            }
            let chosenEmployeeID;
                for (let i = 0; i <employeeNameArray.length; i++) {
                    if (`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}` === answer.employeeID) {
                        chosenEmployeeID = employeeNameArray[i][0];
                    }
                }
            let chosenRoleID;
                for (let i = 0; i <roleNameArray.length; i++) {
                    if (roleNameArray[i][1] === answer.roleID) {
                        chosenRoleID = roleNameArray[i][0];
                    }
                }
            //UPDATE company_db.employee
	        //SET roleID = roleID_value
            //WHERE id = id_value;
            db.updateQuery(chosenRoleID, chosenEmployeeID);
            })
}

function deleteDepartmentPrompt(){
    let departmentNameArray = [];
    db.getDepartmentNames(departmentNameArray);
        inquirer
                .prompt([
                    {
                        type: "confirm",
                        message: "WARNING! Deleting a department will also delete all related roles and employees within a department. Are you sure you want to continue?",
                        name: "warning"
                    },
                    {
                        type: "list",
                        message: "What department would you like to delete?",
                        choices: function() {
                            let choiceArray = [];
                            for (let i = 0; i < departmentNameArray.length; i++) {
                              choiceArray.push(departmentNameArray[i][1]);
                            }
                            return choiceArray;
                          },
                        name: "departmentID",
                        when: (answers) => answers.warning === true         
                    }
                ]
                ).then( function(answer) {
                    if (answer.warning === false){
                        return start();
                    }
                    let chosenDepartmentID;
                    for (let i = 0; i <departmentNameArray.length; i++) {
                    if (departmentNameArray[i][1] === answer.departmentID) {
                        chosenDepartmentID = departmentNameArray[i][0];
                    }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    db.deleteQuery("company_db.department", chosenDepartmentID)
                });
}

function deleteRolePrompt(){
    let roleNameArray = [];
    db.getRoleNames(roleNameArray);
        inquirer
                .prompt([
                    {
                        type: "confirm",
                        message: "WARNING! Deleting a role will also delete all related employees within a role. Are you sure you want to continue?",
                        name: "warning"
                    },
                    {
                        type: "list",
                        message: "What role would you like to delete?",
                        choices: function() {
                            let choiceArray = [];
                            for (let i = 0; i < roleNameArray.length; i++) {
                              choiceArray.push(roleNameArray[i][1]);
                            }
                            return choiceArray;
                          },
                        name: "roleID",
                        when: (answers) => answers.warning === true         
                    }
                ]
                ).then( function(answer) {
                    if (answer.warning === false){
                        return start();
                    }
                    let chosenRoleID;
                    for (let i = 0; i <roleNameArray.length; i++) {
                    if (roleNameArray[i][1] === answer.roleID) {
                        chosenRoleID = roleNameArray[i][0];
                    }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    db.deleteQuery("company_db.role", chosenRoleID)
                });
}

function deleteEmployeePrompt(){
    let employeeNameArray = [];
    db.getEmployeeNames(employeeNameArray);
        inquirer
                .prompt([
                    {
                        type: "confirm",
                        message: "WARNING! Deleting an employee will remove them from the Employee directory. Are you sure you want to continue?",
                        name: "warning"
                    },
                    {
                        type: "list",
                        message: "What employee would you like to delete?",
                        choices: function() {
                            let choiceArray = [];
                            for (let i = 0; i < employeeNameArray.length; i++) {
                              choiceArray.push(`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}`);
                            }
                            return choiceArray;
                          },
                        name: "employeeID",
                        when: (answers) => answers.warning === true         
                    }
                ]
                ).then( function(answer) {
                    if (answer.warning === false){
                        return start();
                    }
                    let chosenEmployeeID;
                    for (let i = 0; i <employeeNameArray.length; i++) {
                    if (`${employeeNameArray[i][1]} ${employeeNameArray[i][2]}` === answer.employeeID) {
                        chosenEmployeeID = employeeNameArray[i][0];
                    }
                    }
                    //DELETE FROM "table" WHERE id = "id_value"
                    db.deleteQuery("company_db.employee", chosenEmployeeID)
                });
}

start();

exports.start = start;