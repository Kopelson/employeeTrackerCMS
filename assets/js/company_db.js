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



//CRUD for company_db
// function createTable(table){
    
// }

// function readTable(table) {
    
// }

// function updateTable(table){

// }

// function deleteTable(table){


// }
//documentation on exports/requires https://nodejs.org/api/modules.html
module.exports = {

  getConnection: function(){
    connection.connect(function(err) {
      if (err) throw err;
      server.start();
    })
  }, 

  endConnection: function(){
    connection.end();
  },

  viewQuery: function(select, from){
    connection.query(`SELECT ${select} FROM ${from}`, function(error, res) {
        if (error) throw err;
        console.log(res);
        server.start();
      }
    ); 
}

}