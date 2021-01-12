<<<<<<< HEAD
const mongo = 
=======
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Alex",
  password: "1855"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

console.log('yes')
>>>>>>> SamBranch
