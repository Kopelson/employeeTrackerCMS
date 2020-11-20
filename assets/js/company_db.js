//Connect to db
const mysql = require("mysql");
const server = require("../../server");
const chalk = require('chalk');
const Table = require('easy-table')

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "kopelson2001",
  database: "company_db"
});

const db = {
  //start connection to database
  getConnection: function(){
    connection.connect(function(err) {
      if (err) throw err;
      server.start();
    })
  }, 
  //ends connection to database
  endConnection: function(){
    connection.end();
  },
  //view different tables in the database
  viewQuery: function(select, from){
    connection.query(`SELECT ${select} FROM ${from}`, function(error, res) {
        if (error) throw err;
        let t = new Table;
        switch(from){
          case "company_db.employee":
            res.forEach(function(employee) {
              t.cell(chalk.green('ID'), chalk.green(employee.id))
              t.cell(chalk.green('First'), chalk.green(employee.first_name))
              t.cell(chalk.green('Last'), chalk.green(employee.last_name))
              t.newRow()
            });
            break;
          case "company_db.role":
            res.forEach(function(role) {
              t.cell(chalk.yellow('ID'), chalk.yellow(role.id))
              t.cell(chalk.yellow('Title'), chalk.yellow(role.title))
              t.cell(chalk.yellow('Salary'), chalk.yellow(role.salary))
              t.newRow()
            });
            break;
          case "company_db.department":
            res.forEach(function(department) {
              t.cell(chalk.red('ID'), chalk.red(department.id))
              t.cell(chalk.red('Name'), chalk.red(department.name))
              t.newRow()
            });
        }
        console.log(t.toString())
        server.start();
    })
  },

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
        let t = new Table;

        res.forEach(function(employee) {
          t.cell(chalk.green('Name'), chalk.green(employee.Employee))
          t.cell(chalk.yellow('Role'), chalk.yellow(employee["Role Title"]))
          t.cell(chalk.red('Department'), chalk.red(employee.Department))
          t.cell(chalk.yellow('Salary'), chalk.yellow(employee.Salary))
          t.newRow()
        });

        console.log(t.toString())

        server.start();
      }
    )
  },

  addQuery: function(table, col, value){
    //INSERT INTO department (name)
    //VALUES ("Production")
    connection.query(`INSERT INTO ${table} (${col}) VALUES (${value})`, function(error) {
      if (error) throw err;
      console.log(`Success!`);
      server.start();
    })
  },

  deleteQuery: function(table, id){
    //DELETE FROM company_db.department
    //WHERE id = id_value;
    connection.query(`Delete FROM ${table} WHERE id = ${id}`, function(error) {
      if (error) throw err;
      console.log(`Success!`);
      server.start();
    })
  },

  updateQuery: function(set, where){
    connection.query(`UPDATE company_db.employee SET roleID = ${set} WHERE id = ${where}`, function (error) {
      if (error) throw err;
      console.log('Success!');
      server.start();
    })
  },

  getDepartmentNames: function(arr){
    connection.query(`SELECT * from company_db.department`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push([res[i].id, res[i].name]);
      }
      return arr;
    })
  },

  getRoleNames: function(arr){
    connection.query(`SELECT * from company_db.role`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push([res[i].id, res[i].title]);
      }
      return arr;
    })
  },

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