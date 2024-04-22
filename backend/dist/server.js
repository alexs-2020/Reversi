// Load required modules
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql2");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const { Server, Socket } = require("socket.io"); // Importing the Server class from socket.io
const modelGame = require("/Users/kanachiweli/swe'24/Reversi/backend/dist/model/game.js").default;
const WebGameView = require("/Users/kanachiweli/swe'24/Reversi/backend/dist/view/web_game_view.js").default;
const GameController = require("/Users/kanachiweli/swe'24/Reversi/backend/dist/controller/game_controller_web.js").default;
const http = require("http");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const server_app = http.createServer(app); // HTTP server for socket.io
const io = new Server(server_app, {
  // Using the Server class to create the instance
  cors: {
    origin: "*", // This should match your front-end URL or be '*' for open access
    methods: ["GET", "POST"],
  },
});

class Player {
  /**
   * Creates an instance of a Player.
   * @param {string} id - The socket ID of the player.
   * @param {string} username - The username of the player.
   * @param {Socket} socket - The socket associated with the player.
   */
  constructor(id, username, socket) {
    this.id = id;
    this.username = username;
    this.socket = socket;
  }
}

class Game {
  /**
   * Creates an instance of a Game.
   * @param {string} id - The unique ID of the game.
   * @param {Player} player1 - The first player in the game.
   * @param {Player} player2 - The second player in the game.
   */
  constructor(id, player1, player2) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
  }
}

/** @type {Object<string, Player>} */
const players = {};

/** @type {Object<string, Game>} */
const games = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);



  socket.on("addPlayer", (username) => {
    // Check if the username already exists
    for (let key in players) {
      if (players[key].username === username && players[key].id !== socket.id) {
        console.log(
          `Username already in use. Disconnecting old session: ${username}`,
        );
        players[key].socket.disconnect(true); // Forcefully disconnect the old session
        delete players[key]; // Remove the old player from the list
        break;
      }
    }

    // Register the new player
    players[socket.id] = new Player(socket.id, username, socket);
    console.log(`Player registered: ${username}`);
    updatePlayerList();
  });

  socket.on("startGame", (opponentName) => {
    const currentPlayer = players[socket.id];
    let opponentData = new Player(null, null, null);
    for (let key in players) {
      if (players[key].username === opponentName) {
        opponentData = players[key];
        break; // Exit the loop once the opponent is found
      }
    }
    const opponentId = opponentData.id;
    if (opponentId) {
      const gameId = `game-${socket.id}-${opponentId}`;
      games[gameId] = new Game(gameId, players[socket.id], players[opponentId]);
      console.log(`Game started: ${gameId}`);
      const boardSize = 8;
      const model = new modelGame(
        boardSize,
        currentPlayer.username,
        opponentData.username,
          players,
        opponentData,

      );
      const view = new WebGameView(model.board);
      const controller = new GameController(model,view,io,gameId);
      controller.startGame(gameId);

      players[socket.id].socket.emit("gameStarted", {
        gameId,
        opponent: players[opponentId].username,
      });
      players[opponentId].socket.emit("gameStarted", {
        gameId,
        opponent: players[socket.id].username,
      });

    } else {
      console.log(
        `Could not start Game with opponent(opponent might be disconnected) : ${opponentName}`,
      );
    }
  });
  socket.on("updateGame", ({ gameId, gameData }) => {
  if (games[gameId]) { // Check if the game exists
    console.log(`Update received for game ${gameId}: ${JSON.stringify(gameData)}`);
    // Update game logic here (not shown)

    // Emit update to all players involved in the game
    const game = games[gameId];
    game.player1.socket.emit("gameUpdate", { gameId, gameData });
    game.player2.socket.emit("gameUpdate", { gameId, gameData });

    // Additionally log updates for all games (example of monitoring all games)
    Object.keys(games).forEach(id => {
      console.log(`Monitoring - Game ID ${id}:`, JSON.stringify(games[id]));
    });
  } else {
    console.log(`No game found with ID ${gameId}`);
  }
});


  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    if (players[socket.id]) {
      delete players[socket.id];
      updatePlayerList();
    }

    // End game if one player disconnects
    Object.keys(games).forEach((gameId) => {
      if (
        games[gameId].player1.id === socket.id ||
        games[gameId].player2.id === socket.id
      ) {
        delete games[gameId];
        console.log(`Game ended: ${gameId}`);
      }
    });
  });


  function updatePlayerList() {
    // Map over the `players` object to extract just the usernames
    const usernames = Object.values(players).map((player) => player.username);
    // Emit only the list of usernames to all connected clients
    io.emit("playerList", usernames);
  }
});

// Database connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    throw err;
  }
  console.log("connected to MySql");
  db.query("CREATE DATABASE IF NOT EXISTS myddb", (err) => {
    if (err) {
      throw err;
    }
    console.log("DB created/Exists");
    db.changeUser({ database: "myddb" }, (err) => {
      if (err) {
        throw err;
      }
      createTable();
    });
  });
});

// Database table creation
function createTable() {
  const {
    UserQuery,
    BoardQuery,
    PiecesQuery,
    GameQuery,
  } = require("./routes/Template");
  const userQuery = new UserQuery().build().query;
  const boardQuery = new BoardQuery().build().query;
  const pieceQuery = new PiecesQuery().build().query;
  const gameQueryQuery = new GameQuery().build().query;

  db.query(userQuery, handleTableCreation("User"));
  db.query(boardQuery, handleTableCreation("Board"));
  db.query(pieceQuery, handleTableCreation("Piece"));
  db.query(gameQueryQuery, handleTableCreation("Game"));
}

function handleTableCreation(tableName) {
  return (err) => {
    if (err) {
      throw err;
    }
    console.log(`${tableName} table Created/Exists`);
  };
}

// Routes
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving users from database");
    } else {
      res.json(results);
    }
  });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check if the user exists
  const sql = " SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, users) => {
    if (err) {
      return res.status(500).send("Error fetching user");
    }
    if (users.length === 0) {
      return res.status(401).json({ message: "User not found." });
    }

    // User found, now compare the provided password with the hashed password
    const user = users[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send("Error comparing passwords");
      }
      if (!result) {
        // Passwords do not match
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Implement  token logic here - generating a JWT
      res.send("Login successful");
    });
  });
});

app.put("/updateScore", (req, res) => {
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
    },
  );
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const userQueryBuilder = require("./userQueryBuilder");
  const checkUsernameSql = userQueryBuilder
    .createQuery(username)
    .checkUsername()
    .build();

  db.query(
    checkUsernameSql.query,
    checkUsernameSql.fields,
    handleUsernameCheck(username, password, res),
  );
});

function handleUsernameCheck(username, password, res) {
  return (err, result) => {
    if (err) {
      return res.status(500).send("Error checking username availability");
    }
    if (result[0]["COUNT(*)"] > 0) {
      // Assuming COUNT(*) is returned
      return res.status(409).json({ message: "Username is already taken" });
    }
    bcrypt.hash(password, saltRounds, handlePasswordHashing(username, res));
  };
}

function handlePasswordHashing(username, res) {
  return (err, hash) => {
    if (err) {
      return res.status(500).send("Error hashing password");
    }
    const {
      UserQueryBuilder,
      BoardQueryBuilder,
    } = require("./routes/DbBuilder");
    const userQueryBuilder = new UserQueryBuilder();
    const newUser = userQueryBuilder
      .setUsername(username)
      .setPassword(hash)
      .signUp()
      .build();
    db.query(newUser.query, newUser.fields, handleUserRegistration(res));
  };
}

function handleUserRegistration(res) {
  return (err, result) => {
    if (err) {
      return res.status(500).send("Error registering user");
    }
    res.send("User registered successfully");
  };
}

server_app.listen(PORT, () => {
  console.log(`Server and WebSocket listening on ${PORT}`);
});
