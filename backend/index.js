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


const { UserQueryBuilder, BoardQueryBuilder } = require('./routes/DbBuilder');

// Example usage for creating a new user
const userQueryBuilder = new UserQueryBuilder();
const userQuery = userQueryBuilder.build().query;
 userQueryBuilder.reset();
 boardQuery = new BoardQueryBuilder().build();


console.log(userQuery);
// Execute userQuery against your database here

// Example usage for creating a new board

// console.log(boardQuery);
// Execute boardQuery against your database here

function createTable() {
    //  create user table
    db.query(userQuery, err => {
      if(err){
          throw err
        }
        console.log("User table Created/Exists")
  })

    //  create board table
    db.query(boardQuery, err => {
      if(err){
          throw err
        }
        console.log("Board table Created/Exists")
  })
  //  create piece table
  db.query('CREATE TABLE IF NOT EXISTS pieces (id INT AUTO_INCREMENT PRIMARY KEY, board_id INT, position VARCHAR(5), color VARCHAR(100), FOREIGN KEY (board_id) REFERENCES board(id))', err => {
    if(err){
        throw err
      }
      console.log("Piece table Created/Exists")
    })
    //  create game_session table
    db.query('CREATE TABLE IF NOT EXISTS game_sessions (id INT AUTO_INCREMENT PRIMARY KEY, board_id INT, user_id INT, FOREIGN KEY (board_id) REFERENCES board(id), FOREIGN KEY (user_id) REFERENCES users(id))', err => {
      if(err){
          throw err
        }
        console.log("Game table Created/Exists")
    })
}


app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }
  // Check if the username already exists
  const checkUsernameSql = userQueryBuilder.setUsername(username).checkUsername().build();
  db.query(checkUsernameSql.query, checkUsernameSql.fields, (err, result) => {
    userQueryBuilder.reset();
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
        userQueryBuilder.setUsername(username).setPassword(hash).signUp()
        const newUser = userQueryBuilder.build();
        userQueryBuilder.reset();
        db.query(newUser.query, newUser.fields, (err, result) => {
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

      // Implement  token logic here - generating a JWT
      res.send('Login successful');
    });
  });
});

app.put("/updatescore", (req, res) => {
  const { username } = req.body;
  // increases the 'score' for a user by 1 where the 'username' matches.
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


  