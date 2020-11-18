// const mysql = require("mysql");
const inquirer = require("inquirer");
const { endConnection } = require("./assets/js/company_db");
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
                        break;
                    case "VIEW  Company Roles":
                        //add function
                        break;
                    case "VIEW Company Departments":
                        //add function
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