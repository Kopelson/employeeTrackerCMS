//Connect to db
const mysql = require("mysql");
const server = require("../../server");

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

//documentation on exports/requires https://nodejs.org/api/modules.html
module.exports = {
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
        console.log(res);
        server.start();
    })
  },

  addQuery: function(table, col, value){
    //INSERT INTO department (name)
    //VALUES ("Production")
    connection.query(`INSERT INTO ${table} (${col}) VALUES (${value})`, function(error) {
      if (error) throw err;
      console.log(`Success! ${value} has been added to the company ${table}!`);
      server.start();
    })
  },

  getDepartmentNames: function(arr){
    connection.query(`SELECT * from company_db.department`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push(res[i].name);
      }
      return arr;
    })
  },

  getRoleNames: function(arr){
    connection.query(`SELECT * from company_db.role`, function(error, res) {
      if (error) throw err;
      for (let i = 0; i < res.length; i++){
        arr.push(res[i].title);
      }
      return arr;
    })
  }
}