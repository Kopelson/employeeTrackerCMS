//require necessary dependencies
const mysql = require("mysql");
const server = require("../../server");
const chalk = require('chalk');
const Table = require('easy-table')
//this creates a new connection to mysql database
const connection = mysql.createConnection({
  //this stores the host name
  host: "localhost",
  //this stores the port number
  port: 3306,
  //this stores the root name
  user: "root",
  //this stores the root password
  password: "",
  //this store the database name
  database: "company_db"
});
//db stores an object full methods that are used by the server.js that handle different database needs
const db = {
  //starts the connection to database
  getConnection: function(){
    connection.connect(function(err) {
      if (err) throw err;
      server.start();
    })
  }, 
  //ends the connection to database
  endConnection: function(){
    connection.end();
  },
  //view different tables in the database
  viewQuery: function(select, from){
    connection.query(`SELECT ${select} FROM ${from}`, function(error, res) {
        if (error) throw err;
        //this makes a new instance of Table and assigns it to "t"
        let t = new Table;
        //this adds logic to pick the right table creation
        switch(from){
          case "company_db.employee":
            //this loops through the response and makes a pretty looking table and adds different color to each variable
            res.forEach(function(employee) {
              t.cell(chalk.green('ID'), chalk.green(employee.id))
              t.cell(chalk.green('First'), chalk.green(employee.first_name))
              t.cell(chalk.green('Last'), chalk.green(employee.last_name))
              t.newRow()
            });
            break;
          case "company_db.role":
            //this loops through the response and makes a pretty looking table and adds different color to each variable
            res.forEach(function(role) {
              t.cell(chalk.yellow('ID'), chalk.yellow(role.id))
              t.cell(chalk.yellow('Title'), chalk.yellow(role.title))
              t.cell(chalk.yellow('Salary'), chalk.yellow(role.salary))
              t.newRow()
            });
            break;
          case "company_db.department":
            //this loops through the response and makes a pretty looking table and adds different color to each variable
            res.forEach(function(department) {
              t.cell(chalk.red('ID'), chalk.red(department.id))
              t.cell(chalk.red('Name'), chalk.red(department.name))
              t.newRow()
            });
        }
        //this then prints the "t" instance table that was created to the console
        console.log(t.toString())
        //this restarts the server prompts
        server.start();
    })
  },
  //this is a comprehensive  employee query that gets all related data for each employee
  comprehensiveEmployeeQuery: function(){
    connection.query(`
      SELECT 
          concat(employee.first_name,' ', employee.last_name) as Employee,
          role.title as "Role Title",
          department.name as Department,
          role.salary as "Salary"
      FROM employee 
      INNER JOIN role ON employee.roleID = role.id
      INNER JOIN department ON role.departmentID = department.id;`, 
      function(error, res) {
        if (error) throw err;
        //this makes a new instance of Table and assigns it to "t"
        let t = new Table;
        //this loops through the response and makes a pretty looking table and adds different color to each variable
        res.forEach(function(employee) {
          t.cell(chalk.green('Name'), chalk.green(employee.Employee))
          t.cell(chalk.yellow('Role'), chalk.yellow(employee["Role Title"]))
          t.cell(chalk.red('Department'), chalk.red(employee.Department))
          t.cell(chalk.yellow('Salary'), chalk.yellow(employee.Salary))
          t.newRow()
        });
        //this then prints the "t" instance table that was created to the console
        console.log(t.toString())
        //this restarts the server prompts
        server.start();
      }
    )
  },
  //this adds to the database by taking in what table name, name of each column, and new values of each column
  addQuery: function(table, col, value){
    //INSERT INTO department (name)
    //VALUES ("Production")
    connection.query(`INSERT INTO ${table} (${col}) VALUES (${value})`, function(error) {
      if (error) throw err;
      //tells the user if the query was a success
      console.log(`Success!`);
      server.start();
    })
  },
  //this deletes from the database by taking in the table name, and the id of the recode that needs deleted
  deleteQuery: function(table, id){
    //DELETE FROM company_db.department
    //WHERE id = id_value;
    connection.query(`Delete FROM ${table} WHERE id = ${id}`, function(error) {
      if (error) throw err;
      //tells the user if the query was a success
      console.log(`Success!`);
      server.start();
    })
  },
  //this updates the employee's role by changing the roleID by the employee's id
  updateQuery: function(set, where){
    connection.query(`UPDATE company_db.employee SET roleID = ${set} WHERE id = ${where}`, function (error) {
      if (error) throw err;
      //tells the user if the query was a success
      console.log('Success!');
      server.start();
    })
  },
  //this returns an array with all the department table information
  getDepartmentNames: function(arr){
    connection.query(`SELECT * from company_db.department`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push([res[i].id, res[i].name]);
      }
      return arr;
    })
  },
  //this returns an array with all the role table information
  getRoleNames: function(arr){
    connection.query(`SELECT * from company_db.role`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push([res[i].id, res[i].title]);
      }
      return arr;
    })
  },
  //this returns an array with all the employee information
  getEmployeeNames: function(arr){
    connection.query(`SELECT * from company_db.employee`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push([res[i].id, res[i].first_name, res[i].last_name]);
      }
      return arr;
    })
  }
}
//documentation on exports/requires https://nodejs.org/api/modules.html
module.exports = db