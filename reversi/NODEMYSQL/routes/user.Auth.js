const bcrypt = require('bcrypt');
const saltRounds = 10; // for bcrypt




app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  // Check if the username already exists
  const checkUsernameSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameSql, [username], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking username availability');
    }
    if (result.length > 0) {
      // Username already exists
      return res.status(409).send('Username is already taken');
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
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, users) => {
    if (err) {
      return res.status(500).send('Error fetching user');
    }
    if (users.length === 0) {
      return res.status(404).send('User not found');
    }

    // User found, now compare the provided password with the hashed password
    const user = users[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }
      if (!result) {
        // Passwords do not match
        return res.status(401).send('Invalid credentials');
      }

      // Passwords match, login successful
      // Implement your session or token logic here, for example, generating a JWT
      res.send('Login successful');
    });
  });
});


















// const router = require("express").Router();
// const User = require("../models/User.model")

// // router.post('/users/:id/uploads', (req, res)=>{
// //     let url = req.body.uploads
// //     let id = req.params.id
// //     console.log(id)
// //     User.findByIdAndUpdate(id, {$push: {uploads: url }})
// //     .then(user =>{ 
// //         res.json(user)
// //     })
// //   })
  
// // router.get('/users/:id', (req, res)=>{
// //     let id = req.params.id
// //     console.log(id)
// //     User.findById(id)
// //     .then(user =>{ 
// //         res.json(user)
// //     })
// //   })

//   module.exports = router;