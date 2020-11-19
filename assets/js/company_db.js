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
        console.log(res);
        server.start();
    })
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