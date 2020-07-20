const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const app = express();

app.use(require('./dbconnection.js'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
  
  module.exports = router;
