//Connect to db
const mysql = require("mysql");

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
module.exports = {
  getConnection: function(){
    connection.connect(function(err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId + "\n");
      connection.end();
    })
  } 
}