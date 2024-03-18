const bcrypt = require('bcrypt');
const saltRounds = 10;



const express = require("express");
const mysql = require("mysql")

const PORT = process.env.PORT || 3001;
const cors = require('cors');
// app.use(cors());
const app = express();

app.use(cors());
app.use(express.json());

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
    db.query('CREATE DATABASE IF NOT EXISTS myddb', err => {
        if(err){
          throw err
        }
        console.log('DB created/Exists')
        //connect user to database
        db.changeUser({database: 'myddb'}, err =>{
            if(err){
                throw err
              }
              createTable();
        });



    })
})

function createTable() {
    //  does not conitnue on next line for some reason
    db.query('CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100), score INT)', err => {
        if(err){
            throw err
          }
          console.log("User table Created/Exists")
    })
}


app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  // Check if the username already exists
  const checkUsernameSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameSql, [username], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking username availability');
    }
    if (result.length > 0) {
      // Username already exists
      return res.status(409).json({ message: "Username is already taken" });
    } else {
      // Username is available, proceed with hashing password
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(500).send('Error hashing password');
        }
        // create user
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hash], (err, result) => {
          if (err) {
            return res.status(500).send('Error registering user');
          }
          res.send('User registered successfully');
        });
      });
    }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, users) => {
    if (err) {
      return res.status(500).send('Error fetching user');
    }
    if (users.length === 0) {
      return res.status(401).json({ message: "User not found." })
    }

    // User found, now compare the provided password with the hashed password
    const user = users[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }
      if (!result) {
        // Passwords do not match
        return res.status(401).json({ message: "Invalid credentials"});
      }

      // Passwords match, login successful
      // Implement your session or token logic here, for example, generating a JWT
      res.send('Login successful');
    });
  });
});

app.put("/updatescore", (req, res) => {
  const { username } = req.body;
  // Assuming your user table is named 'users' and has a 'score' column.
  // This query increases the 'score' for a user by 1 where the 'username' matches.
  db.query(
    "UPDATE users SET score = score + 1 WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating score");
      } else {
        res.send("Score updated successfully");
      }
    }
  );
});


// db.query('SELECT * FROM users', (err, results, field) => {
//     if(err){
//         throw err
//     }
//     results.forEach(element => {
//         console.log(element)
//     });
// })



// const router = express.Router();
// const userRoute = require("./routes/user.Auth");
// app.use("/api", userRoute);



// const API_URL = "http://localhost:3000";

// router.post('/signup', (req, res) => {

//   const { username, password } = req.body;
//   console.log(username);
//   if (!username || !password) {
//     return res.status(400).send('Username and password are required');
//   }
//   // Check if the username already exists
//   const checkUsernameSql = 'SELECT * FROM users WHERE username = ?';
//   db.query(checkUsernameSql, [username], (err, result) => {
//     if (err) {
//       return res.status(500).send('Error checking username availability');
//     }
//     if (result.length > 0) {
//       // Username already exists
//       return res.status(409).send('Username is already taken');
//     } else {
//       // Username is available, proceed with hashing password
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) {
//           return res.status(500).send('Error hashing password');
//         }
//         // create user
//         const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
//         db.query(sql, [username, hash], (err, result) => {
//           if (err) {
//             return res.status(500).send('Error registering user');
//           }
//           res.send('User registered successfully');
//         });
//       });
//     }
//   });
// });



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


  