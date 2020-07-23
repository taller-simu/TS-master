
const mysqlConnection  = require('./dbconnection');
const express = require('express');
const router = express.Router();
// connect to MySQL
mysqlConnection.query('CREATE DATABASE mydb', function(err){
            if(err) {
                console.log(err);
            } else {
                console.log('Database created');
            }
        })
    mysqlConnection.end();

module.exports = router;
