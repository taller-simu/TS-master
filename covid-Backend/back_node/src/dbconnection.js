const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'basededatos'
  
});

mysqlConnection.connect((err)=>{
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;

/*//Create database
app.get('/createdb',(req, res)=>{
    let sql = 'CREATE DATABASE basededatos';
    con.query(sql, (err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send("database created"); 
    });
});

//Create Table
app.get('/createtable',(req,res)=>{
    let sql='CREATE TABLE datos(id int AUTO_INCREMENT, title VARCHAR(255),boDy VARCHAR(255), PRIMARY KEY(id))';
    con.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send("table created"); 
    });
});

//insert post 
app.get('/addpost1',(req,res)=>{
    let post = {title:'post one', body:'body post'};
    let
});
app.listen('3000',()=>{
    console.log("sadsadad");
});
*/