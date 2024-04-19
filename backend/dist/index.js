// const express = require("express");
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const mysql = require('mysql2');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');
// const userQueryBuilder = require('./userQueryBuilder');
//
//
// const PORT = process.env.PORT || 3001;
//
//
// // app.use(cors());
// const app = express();
//
// app.use(cors());
// app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//
//
// //create connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port:3306
// })
//
// //connect to MySql
// db.connect(err => {
//     if(err){
//        console.error('Error connecting: ' + err.stack);
//         throw err
//     }
//     console.log('connected to MySql')
//     //Create Database
//     db.query('CREATE DATABASE IF NOT EXISTS myddb', err => {
//         if(err){
//           throw err
//         }
//         console.log('DB created/Exists')
//         //connect user to database
//         db.changeUser({database: 'myddb'}, err =>{
//             if(err){
//                 throw err
//               }
//               createTable();
//         });
//     })
// })
//
// // Builders
// // const { UserQueryBuilder, BoardQueryBuilder } = require('./routes/DbBuilder');
//
// // // Create appropriate builders
// // const userQueryBuilder = new UserQueryBuilder();
// // const userQuery = userQueryBuilder.build().query;
// // userQueryBuilder.reset();
//
// // const boardQueryBuilder = new UserQueryBuilder();
// // const boardQuery = boardQueryBuilder.build().query;
// // boardQueryBuilder.reset();
// const { UserQuery, BoardQuery, PiecesQuery, GameQuery} = require('./routes/Template');
//
//
// const userQuery = new UserQuery().build().query;
// const boardQuery = new BoardQuery().build().query;
// const pieceQuery = new PiecesQuery().build().query;
// const gameQueryQuery = new GameQuery().build().query;
//
//
//
// function createTable() {
//     //  create user table
//     db.query(userQuery, err => {
//       if(err){
//           throw err
//         }
//         console.log("User table Created/Exists")
//   })
//
//     //  create board table
//     db.query(boardQuery, err => {
//       if(err){
//           throw err
//         }
//         console.log("Board table Created/Exists")
//   })
//   //  create piece table
//   db.query(pieceQuery, err => {
//     if(err){
//         throw err
//       }
//       console.log("Piece table Created/Exists")
//     })
//     //  create game_session table
//     db.query(gameQueryQuery, err => {
//       if(err){
//           throw err
//         }
//         console.log("Game table Created/Exists")
//     })
// }
//
// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       res.status(500).send('Error retrieving users from database');
//     } else {
//       res.json(results);
//     }
//   });
// });
//
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;
//   if (username === '' || password === '') {
//     res.status(400).json({ message: "Provide username and password" });
//     return;
//   }
//   // Check if the username already exists
//   // const checkUsernameSql = userQueryBuilder.setUsername(username).checkUsername().build();
//   userQueryBuilder.createQuery(username)
//   const checkUsernameSql = userQueryBuilder.checkUsername().build();
//   db.query(checkUsernameSql.query, checkUsernameSql.fields, (err, result) => {
//     userQueryBuilder.reset();
//     if (err) {
//       return res.status(500).send('Error checking username availability');
//     }
//     if (result[0]['COUNT(*)'] > 0) { // Assuming COUNT(*) is returned
//       return res.status(409).json({ message: "Username is already taken" });
//     }
//      else {
//       // Username is available, proceed with hashing password
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) {
//           return res.status(500).send('Error hashing password');
//         }
//         const userQueryBuilder = new UserQueryBuilder();
//         const newUser = userQueryBuilder.setUsername(username)
//                                        .setPassword(hash)
//                                        .signUp()
//                                        .build();
//
//         userQueryBuilder.reset();
//          db.query(newUser.query, newUser.fields, (err, result) => {
//            userQueryBuilder.reset();
//            if (err) {
//              return res.status(500).send('Error registering user');
//            }
//            res.send('User registered successfully');
//         });
//       });
//     }
//   });
// });
//
//
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === '' || password === '') {
//     res.status(400).json({ message: "Provide email and password." });
//     return;
//   }
//
//   // Check if the user exists
//   const sql = ' SELECT * FROM users WHERE username = ?';
//   db.query(sql, [username], (err, users) => {
//     if (err) {
//       return res.status(500).send('Error fetching user');
//     }
//     if (users.length === 0) {
//       return res.status(401).json({ message: "User not found." })
//     }
//
//     // User found, now compare the provided password with the hashed password
//     const user = users[0];
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return res.status(500).send('Error comparing passwords');
//       }
//       if (!result) {
//         // Passwords do not match
//         return res.status(401).json({ message: "Invalid credentials"});
//       }
//
//       // Implement  token logic here - generating a JWT
//       res.send('Login successful');
//     });
//   });
// });
//
// app.put("/updatescore", (req, res) => {
//   const { username } = req.body;
//   // increases the 'score' for a user by 1 where the 'username' matches.
//   db.query(
//     "UPDATE users SET score = score + 1 WHERE username = ?",
//     [username],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Error updating score");
//       } else {
//         res.send("Score updated successfully");
//       }
//     }
//   );
// });
//
//
//
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const httpServer = createServer(app);
// const io = new Server(httpServer);
//
//
//
// const gameLogic = require('../gameLogic')
// const {UserQueryBuilder} = require("./routes/DbBuilder"); //WHATEVER IT IS
//
// // get the gameID encoded in the URL.
// // check to see if that gameID matches with all the games currently in session.
// // join the existing game session.
// // create a new session.
// // run when client connects
// const games = {};
//
// io.on('connection', client => {
//   console.log('A client connected:', client.id);
//
//   client.on('joinGame', (gameID) => {
//     if (games[gameID]) {
//       console.log('Joining existing game:', gameID);
//       client.join(gameID);
//       // Optionally send some game state to client or notify others
//     } else {
//       console.log('Creating new game with ID:', gameID);
//       games[gameID] = { /* some initial game state */ };
//       client.join(gameID);
//       // Initialize new game logic here
//       // gameLogic.initializeGame(io, client, gameID);
//     }
//   });
// });
// // In GAME LOGIC
//
//
//
//
//
// // db.query('SELECT * FROM users', (err, results, field) => {
// //     if(err){
// //         throw err
// //     }
// //     results.forEach(element => {
// //         console.log(element)
// //     });
// // })
//
//
//
// // const router = express.Router();
// // const userRoute = require("./routes/user.Auth");
// // app.use("/api", userRoute);
//
//
//
// // const API_URL = "http://localhost:3000";
//
// // router.post('/signup', (req, res) => {
//
// //   const { username, password } = req.body;
// //   console.log(username);
// //   if (!username || !password) {
// //     return res.status(400).send('Username and password are required');
// //   }
// //   // Check if the username already exists
// //   const checkUsernameSql = 'SELECT * FROM users WHERE username = ?';
// //   db.query(checkUsernameSql, [username], (err, result) => {
// //     if (err) {
// //       return res.status(500).send('Error checking username availability');
// //     }
// //     if (result.length > 0) {
// //       // Username already exists
// //       return res.status(409).send('Username is already taken');
// //     } else {
// //       // Username is available, proceed with hashing password
// //       bcrypt.hash(password, saltRounds, (err, hash) => {
// //         if (err) {
// //           return res.status(500).send('Error hashing password');
// //         }
// //         // create user
// //         const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
// //         db.query(sql, [username, hash], (err, result) => {
// //           if (err) {
// //             return res.status(500).send('Error registering user');
// //           }
// //           res.send('User registered successfully');
// //         });
// //       });
// //     }
// //   });
// // });
//
//
//
//
//
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });
//

  