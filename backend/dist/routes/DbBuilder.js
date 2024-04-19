// QueryBuilder.js

class QueryBuilder {
  constructor() {
    if (new.target === QueryBuilder) {
      throw new Error("QueryBuilder is an abstract class and cannot be instantiated directly.");
    }
    this.query = "";
    this.fields = [];
  }

  build() {
    this.createQuery();
    return this.finalize();
  }

  reset() {
    this.query = "";
    this.fields = [];
  }

  createQuery() {
    throw new Error("createQuery must be implemented by subclasses");
  }

  finalize() {
    return {
      query: this.query,
      fields: this.fields,
    };
  }
}

class UserQueryBuilder extends QueryBuilder {
  constructor() {
    super();
    this.query = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100), wins INT, losses INT, ratio FLOAT)";
  }

  reset() {
    super.reset();
  }

  setUsername(username) {
    this.fields.push(username);
    return this;
  }

  setPassword(password) {
    this.fields.push(password);
    return this;
  }

  checkUsername() {
    this.query = "SELECT * FROM users WHERE username = ?";
    return this;
  }

  signUp() {
    this.query = "INSERT INTO users (username, password) VALUES (?, ?)";
    return this;
  }

  createQuery(username, password = null) {
    this.setUsername(username);
    if (password !== null) {
      this.setPassword(password);
    }
  }
}

class BoardQueryBuilder extends QueryBuilder {
  constructor() {
    super();
    this.query = "CREATE TABLE IF NOT EXISTS board (id INT AUTO_INCREMENT PRIMARY KEY, size INT NOT NULL, current_turn VARCHAR(100), game_state VARCHAR(100))";
  }

  reset() {
    super.reset();
  }

  createQuery(boardAttributes) {
    this.query = `INSERT INTO board (size, current_turn, game_state) VALUES (?, ?, ?)`;
    this.fields = [boardAttributes.size, boardAttributes.currentTurn, boardAttributes.gameState];
    return this;
  }

  updateBoardState(boardId, gameState) {
    this.query = `UPDATE board SET game_state = ? WHERE id = ?`;
    this.fields = [gameState, boardId];
    return this;
  }

  deleteBoard(boardId) {
    this.query = `DELETE FROM board WHERE id = ?`;
    this.fields = [boardId];
    return this;
  }
}

module.exports = { UserQueryBuilder, BoardQueryBuilder };
