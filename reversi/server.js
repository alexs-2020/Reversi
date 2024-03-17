const express = require("express");
const mysql = require("mysql")




const PORT = process.env.PORT || 3001;



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
})


const app = express();

app.get('/createdb', (req, res)=> {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, err => {
    if(err){
      throw err
    }
    console.log('DB created')
  })
})




app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


