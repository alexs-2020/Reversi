const express = require("express");
const mysql = require("mysql")

const PORT = process.env.PORT || 3000;

//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

//connect to MySql
db.connect(err => {
    if(err){
        throw err
    }
    console.log('connected to MySql')
    //Create Database
    db.query('CREATE DATABASE IF NOT EXISTS nodemysql', err => {
        if(err){
          throw err
        }
        console.log('DB created/Exists')
        //connect user to database
        db.changeUser({database: 'mydb'}, err=>{
            if(err){
                throw err
              }
              createTable();
        });



    })
})

function createTable() {
    //  does not conitnue on next line for some reason
    db.query('CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(100))', err=> {
        if(err){
            throw err
          }
          console.log("User table Created/Exists")
    })
}

const app = express();



// db.query('SELECT * FROM users', (err, results, field) => {
//     if(err){
//         throw err
//     }
//     results.forEach(element => {
//         console.log(element)
//     });
// })



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

