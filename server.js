//require dependiencies 
const inquirer = require("inquirer");
const db = require("./assets/js/company_db");
const { endConnection, viewQuery, addQuery, getDepartmentNames} = require("./assets/js/company_db");


db.getConnection();

function start(){
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["VIEW Employee Directory", "VIEW Company Roles", "VIEW Company Departments", "ADD Company Department", "ADD Company Role", "ADD Company Employee", "UPDATE An Employee Role", "DELETE a Company Department", "DELETE a Company Role", "DELETE a Company Employee", "EXIT"],
                name: "action"
            }).then(function(answer) {
                switch (answer.action) {
                    case "VIEW Employee Directory":
                        //SELECT id, first_name, last_name FROM company_db.employee;
                        viewQuery("id, first_name, last_name", "company_db.employee");
                        break;
                    case "VIEW Company Roles":
                        //SELECT id, title, salary FROM company_db.role;
                        viewQuery("id, title, salary", "company_db.role");
                        break;
                    case "VIEW Company Departments":
                        //SELECT * FROM company_db.department;
                        viewQuery("*", "company_db.department");
                        break; 
                    case "ADD Company Department":
                        addDepartmentPrompt();
                        break;
                    case "ADD Company Role": 
                        addCompanyPrompt();
                        break;
                    case "ADD Company Employee": 
                        break;
                    case "UPDATE An Employee Role":
                        break;
                    case "DELETE a Company Department":
                        break;
                    case "DELETE a Company Role":
                        break;
                    case "DELETE a Company Employee": 
                        break;
                    case "EXIT":
                        endConnection();
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
            addQuery(`department`, `name`, `"${capitalizeName}"`)
        })
}

function addCompanyPrompt(){
        let departmentNameArray = [];
        getDepartmentNames(departmentNameArray);
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
                    choices: departmentNameArray,
                    name: "departmentID"
                }
            ]
            ).then( function(answer) {
                let chosenItem;
                for (let i = 0; i <departmentNameArray.length; i++) {
                  if (departmentNameArray[i] === answer.departmentID) {
                    chosenItem = i + 1;
                  }
                }
                //INSERT INTO role (title, salary, departmentID) VALUES ("title_value", salary_value, departmentID_value);
                addQuery("role", `title, salary, departmentID`, `"${answer.title}", ${answer.salary}, ${chosenItem}`);
            })
}
    
exports.start = start;