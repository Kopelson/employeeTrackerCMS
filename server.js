// const mysql = require("mysql");
const inquirer = require("inquirer");
const company_db = require("./assets/js/company_db");
const { endConnection, viewQuery } = require("./assets/js/company_db");
const db = require("./assets/js/company_db");

db.getConnection();

function start(){
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["VIEW Employee Directory", "VIEW  Company Roles", "VIEW Company Departments", "ADD Company  Department", "ADD Company Role", "ADD Company Employee", "UPDATE An Employee Role", "DELETE a Company Department", "DELETE a Company Role", "DELETE a Company Employee", "EXIT"],
                name: "action"
            }).then(function(answer) {
                switch (answer.action) {
                    case "VIEW Employee Directory":
                        //add function
                        //SELECT id, first_name, last_name FROM company_db.employee;
                        viewQuery("id, first_name, last_name", "company_db.employee");
                        break;
                    case "VIEW  Company Roles":
                        //add function
                        //SELECT id, title, salary FROM company_db.role;
                        viewQuery("id, title, salary", "company_db.role");
                        break;
                    case "VIEW Company Departments":
                        //add function
                        //SELECT * FROM company_db.department;
                        viewQuery("*", "company_db.department");
                        break; 
                    case "ADD Company  Department":
                        //add function
                        break;
                    case "ADD Company Role": 
                        //add function
                        break;
                    case "ADD Company Employee":
                        //add function 
                        break;
                    case "UPDATE An Employee Role":
                        //add function
                        break;
                    case "DELETE a Company Department":
                        //add function
                        break;
                    case "DELETE a Company Role":
                        //add function
                        break;
                    case "DELETE a Company Employee":
                        //add function 
                        break;
                    case "EXIT":
                        endConnection();
                }
            })
}

exports.start = start;